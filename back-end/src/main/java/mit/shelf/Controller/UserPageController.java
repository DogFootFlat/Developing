package mit.shelf.Controller;

import mit.shelf.domain.Member;
import mit.shelf.domain.User;
import mit.shelf.repository.BookLocationRepository;
import mit.shelf.repository.LoginRepository;
import mit.shelf.repository.MemberRepository;
import mit.shelf.repository.bookLendingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
public class UserPageController {

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    LoginRepository loginRepository;

    @Autowired
    BookLocationRepository bookLocationRepository;

    @Autowired
    bookLendingRepository bookLendingRepository;

    @GetMapping(value = "/sea") public String search(@RequestParam(value = "keyword") String keyword, Model model, @RequestParam(value = "filter")String filter, @RequestParam(value = "categoryfilter")String categoryfilter, String category, @RequestParam(value = "id") Long id) {

        switch (categoryfilter){
            case "2" :
                category = "기술/과학";
                break;
            case "3" :
                category = "예술";
                break;
            case "4" :
                category = "문학";
                break;
        }

        if (filter.equals("0")) {
            List<Member> searchs = memberRepository.findByName(keyword);
            model.addAttribute("searchs", searchs);

        }
        if (filter.equals("1")) {
            List<Member> searchs = memberRepository.findByWriter(keyword);
            model.addAttribute("searchs", searchs);
        }

        if (categoryfilter.equals("1")){
            List<Member> searchs = memberRepository.findAll();
            model.addAttribute("searchs", searchs);
        }
        if (categoryfilter.equals("2")||categoryfilter.equals("3")||categoryfilter.equals("4")) {
            List<Member> searchs = memberRepository.findByCategory(category);
            model.addAttribute("searchs", searchs);
        }
        User result = loginRepository.userNameIdSharing(id);
        model.addAttribute("loginGo", result.getName());
        model.addAttribute("loginGo2", result.getId());
        return "/borrow";
    }

    @GetMapping(value = "/search")
    public String search(@RequestParam(value = "keyword") String keyword, Model model) {

        List<Member> search = memberRepository.findByName(keyword);
        model.addAttribute("search", search);
        return "borrow";

    }

    @GetMapping(value = "/sea/location") public String searchLocation(@RequestParam(value = "id") Long id, @RequestParam(value = "userId") Long userId, Model model) {
        int color1 = 0;
        int color2 = 0;
        int color3 = 0;
        int color4 = 0;
        int color5 = 0;
        int color6 = 0;
        int color7 = 0;
        int color8 = 0;
        int color9 = 0;
        int color10 = 0;
        int color11 = 0;
        int color12 = 0;
        int color13 = 0;
        int color14 = 0;
        Long result = bookLocationRepository.findBookLocation(id);
        Long bookId1 = bookLocationRepository.findBookLocation(1L);
        Long bookId2 = bookLocationRepository.findBookLocation(2L);
        Long bookId3 = bookLocationRepository.findBookLocation(3L);
        Long bookId4 = bookLocationRepository.findBookLocation(4L);
        Long bookId5 = bookLocationRepository.findBookLocation(5L);
        Long bookId6 = bookLocationRepository.findBookLocation(6L);
        Long bookId7 = bookLocationRepository.findBookLocation(7L);
        Long bookId8 = bookLocationRepository.findBookLocation(8L);
        Long bookId9 = bookLocationRepository.findBookLocation(9L);
        Long bookId10 = bookLocationRepository.findBookLocation(10L);
        Long bookId11 = bookLocationRepository.findBookLocation(11L);
        Long bookId12 = bookLocationRepository.findBookLocation(12L);
        Long bookId13 = bookLocationRepository.findBookLocation(13L);
        Long bookId14 = bookLocationRepository.findBookLocation(14L);



        if (result == 1)
            color1 = 1;
        else if (result == 2)
            color2 = 2;
        else if (result == 3)
            color3 = 3;
        else if (result == 4)
            color4 = 4;
        else if (result == 5)
            color5 = 5;
        else if (result == 6)
            color6 = 6;
        else if (result == 7)
            color7 = 7;
        else if (result == 8)
            color8 = 8;
        else if (result == 9)
            color9 = 9;
        else if (result == 10)
            color10 = 10;
        else if (result == 11)
            color11 = 11;
        else if (result == 12)
            color12 = 12;
        else if (result == 13)
            color13 = 13;
        else if (result == 14)
            color14 = 15;
        model.addAttribute("locations", result);
        model.addAttribute("bookId1", bookId1);
        model.addAttribute("bookId2", bookId2);
        model.addAttribute("bookId3", bookId3);
        model.addAttribute("bookId4", bookId4);
        model.addAttribute("bookId5", bookId5);
        model.addAttribute("bookId6", bookId6);
        model.addAttribute("bookId7", bookId7);
        model.addAttribute("bookId8", bookId8);
        model.addAttribute("bookId9", bookId9);
        model.addAttribute("bookId10", bookId10);
        model.addAttribute("bookId11", bookId11);
        model.addAttribute("bookId12", bookId12);
        model.addAttribute("color1", color1);
        model.addAttribute("color2", color2);
        model.addAttribute("color3", color3);
        model.addAttribute("color4", color4);
        model.addAttribute("color5", color5);
        model.addAttribute("color6", color6);
        model.addAttribute("color7", color7);
        model.addAttribute("color8", color8);
        model.addAttribute("color9", color9);
        model.addAttribute("color10", color10);
        model.addAttribute("color11", color11);
        model.addAttribute("color12", color12);
        model.addAttribute("color13", color13);
        model.addAttribute("color14", color14);

        User result1 = loginRepository.userNameIdSharing(userId);

        model.addAttribute("loginGo", result1.getName());
        model.addAttribute("loginGo2", result1.getId());


        return "/members/bookLocation";
    }

    @GetMapping(value = "/bookLending") public String bookLending(@RequestParam(value = "name") String name,  @RequestParam(value = "id") Long id ,Model model) {
        List<Member> result = bookLendingRepository.findByBookLending(name);
        User result1 = loginRepository.userNameIdSharing(id);
        model.addAttribute("lendingList", result);
        model.addAttribute("loginGo", result1.getName());
        model.addAttribute("loginGo2", result1.getId());
        return "/myborrow";
    }

}
