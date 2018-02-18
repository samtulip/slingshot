package <%= package %>;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import org.junit.Assert;

/**
 *
 */
@SpringBootTest
@ContextConfiguration(classes = {<%= configClassLocation %>})
public abstract class <%= className %> {

  @Given("^I try$")
      public void i_open_google() throws Throwable
      {
          //trying
      }

      @Then("^I fail$")
      public void i_am_on_google() throws Throwable
      {
          Assert.fail("Not implemented yet!");
      }

}
