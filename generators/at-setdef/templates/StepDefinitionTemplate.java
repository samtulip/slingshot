package <%= package %>;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;

/**
 *
 */
@SpringBootTest
@ContextConfiguration(classes = {<%= configClassLocation %>.class})
public abstract class <%= className %> {

}
