package <%= package %>;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

/**
 *
 */
@Configuration
@ComponentScan("<%= componentScan %>")
public class Config {

}
