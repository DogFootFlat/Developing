package mit.shelf.Controller.Api;

import mit.shelf.Form.MemberForm;
import mit.shelf.domain.Book;
import mit.shelf.domain.ExcelData;
import mit.shelf.repository.BookRepository;
import mit.shelf.service.BookService;
import org.apache.commons.io.FilenameUtils;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.json.simple.JSONObject;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", maxAge = 3600)
public class BookApiController {

    @Autowired
    BookService bookService;

    @Autowired
    BookRepository bookRepository;

    JSONObject result = new JSONObject();

    @GetMapping(value = "/books")
    public List<Book> bookList() {
        return bookService.findMembers();
    }

    @GetMapping(value = "/books/{id}")
    public Optional<Book> book(@PathVariable Long id) {
        return bookRepository.findById(id);
    }

    @PutMapping("/books/{id}")
    public JSONObject edit(MemberForm form, @PathVariable Long id) {
        Optional<Book> Book = bookRepository.findById(id);
        Book.ifPresent(book -> {
            book.setName(form.getName());
            book.setBookNum(form.getBookNum());
            book.setBorrower(form.getBorrower());
            book.setUid(form.getUid());
            book.setRUid(form.getSmartUid());
            book.setDonor(form.getDonor());
            book.setBookFloor(form.getBookFloor());
            book.setBookCmp(form.getBookCmp());
            book.setCategory(form.getCategory());
            book.setImg(form.getImg());
            book.setWriter(form.getWriter());
            book.setCount(form.getCount());
            bookRepository.save(book);
        });
        result.put("result", "success");
        return result;
    }

    @PostMapping(value = "/books")
    public JSONObject create(MemberForm form) {
        Book book = new Book();
        book.setName(form.getName());
        book.setBookNum(form.getBookNum());
        book.setBorrower(form.getBorrower());
        book.setUid(form.getUid());
        book.setRUid(form.getSmartUid());
        book.setDonor(form.getDonor());
        book.setBookFloor(form.getBookFloor());
        book.setBookCmp(form.getBookCmp());
        book.setCategory(form.getCategory());
        book.setImg(form.getImg());
        book.setWriter(form.getWriter());
        book.setCount(form.getCount());

        bookService.join(book);
        result.put("result", "success");
        return result;
    }

    @DeleteMapping(value = "/books/{id}")
    public JSONObject deleteBook(@PathVariable Long id) {
        bookRepository.deleteById(id);
        result.put("result", "success");
        return result;
    }

    @PostMapping("/books/excel")
    public String readExcel(@RequestParam("file") MultipartFile file, Model model)
            throws IOException {

        List<ExcelData> dataList = new ArrayList<>();
        String extension = FilenameUtils.getExtension(file.getOriginalFilename());

        if (!extension.equals("xlsx") && !extension.equals("xls")) {
            throw new IOException("엑셀파일만 업로드 해주세요.");
        }

        Workbook workbook = null;

        if (extension.equals("xlsx")) {
            workbook = new XSSFWorkbook(file.getInputStream());
        } else if (extension.equals("xls")) {
            workbook = new HSSFWorkbook(file.getInputStream());
        }

        Sheet worksheet = workbook.getSheetAt(0);

        for (int i = 1; i < worksheet.getPhysicalNumberOfRows(); i++) {
            Row row = worksheet.getRow(i);
            Book book = new Book();
            book.setBookNum((int) row.getCell(0).getNumericCellValue());
            book.setBorrower(row.getCell(1).getStringCellValue());
            book.setName(row.getCell(2).getStringCellValue());
            bookService.join(book);
        }
        model.addAttribute("datas", dataList);
        return "home";

    }
}
