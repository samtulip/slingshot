package <%= package %>;

import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.junit.Assert;
import org.junit.Test;

public class WelcomeControllerIT {

    @Test
    public void welcomeControllerTest() throws Exception {
        try ( CloseableHttpClient client = HttpClients.createDefault() ){
            HttpGet get = new HttpGet("http://localhost:8080<%= path %>");
            String result = client.execute(get,(response) -> {
                return EntityUtils.toString( response.getEntity() );
            });
            Assert.assertEquals("<%= message %>", result);
        }
    }
}
