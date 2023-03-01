package mit.shelf.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberSignupRequestDto {
    private String email;
    private String password;
    private String name;
}
