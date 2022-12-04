package mit.shelf.Controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import mit.shelf.domain.ExcelData;
import mit.shelf.domain.Member;
import mit.shelf.service.MemberService;
import org.apache.commons.io.FilenameUtils;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

@Controller
public class ExcelController {

    @Autowired
    MemberService memberService;

    //책 번호, 대출자, 책 제목
    @GetMapping("/excel")
    public String main() { // 1
        return "excel";
    }

    @PostMapping("/excel/read")
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
            Member member = new Member();
            member.setBookNum((int) row.getCell(0).getNumericCellValue());
            member.setBorrower(row.getCell(1).getStringCellValue());
            member.setName(row.getCell(2).getStringCellValue());
            memberService.join(member);
        }
        model.addAttribute("datas", dataList);
        return "home";

    }
}