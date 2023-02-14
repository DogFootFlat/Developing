package mit.shelf.Controller.Api;

import mit.shelf.Form.MemberForm;
import mit.shelf.domain.Book;
import mit.shelf.repository.BookRepository;
import mit.shelf.service.BookService;
import org.apache.commons.io.FilenameUtils;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
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
    public

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
            book.setLoanCount(form.getLoanCount());
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
        book.setLoanCount(form.getLoanCount());

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

    //첫번째 줄 읽고 매칭해서 입력되도록
    @PostMapping("books/excel")
    public int readExcel(@RequestParam("file") MultipartFile file) throws IOException {
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

        Row rowTest = worksheet.getRow(0);
        int cellCount = rowTest.getPhysicalNumberOfCells();
        ArrayList<String> header = new ArrayList<>();
        for (int i = 0; i < cellCount -1; i++) {
            header.add(rowTest.getCell(i).getStringCellValue());
        }

        int count = 0;
        for (int i = 1; i < worksheet.getPhysicalNumberOfRows(); i++) {
            Row row = worksheet.getRow(i);
            Book book = new Book();

            count++;
            for (int j=0; j < cellCount; j++) {
                String cell = row.getCell(j).getStringCellValue();
                switch (cell) {
                    case ("도서명"):
                        book.setName(cell);
                        break;
                    case ("도서번호"):
                        book.setBookNum((int) row.getCell(j).getNumericCellValue());
                        break;
                    case ("빌린 사람"):
                        book.setBorrower(cell);
                        break;
                    case ("비교 결과"):
                        book.setBookCmp((long) row.getCell(j).getNumericCellValue());
                        break;
                    case ("도서 위치"):
                        book.setBookFloor((int) row.getCell(j).getNumericCellValue());
                        break;
                    case ("기부자"):
                        book.setDonor(cell);
                        break;
                    case ("장르"):
                        book.setCategory(cell);
                        break;
                    case ("작가"):
                        book.setWriter(cell);
                        break;
                    case ("대출 누적"):
                        book.setLoanCount((long) row.getCell(j).getNumericCellValue());
                        break;
                    case ("이미지"):
                        book.setImg(cell);
                        break;
                }
            }
            bookService.join(book);
        }
        return count;
    }

}
