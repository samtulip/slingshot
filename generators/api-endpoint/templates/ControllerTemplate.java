package <%= groupId %>.api;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WelcomeController {

    @RequestMapping(method = RequestMethod.GET,path = "/")
    public String welcome() {
        return "<%= message %>";
    }
}
