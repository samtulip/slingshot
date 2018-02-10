package <%= groupId %>.spring.boot;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan("<%= groupId %>")
@EnableAutoConfiguration
public class Config {
}
