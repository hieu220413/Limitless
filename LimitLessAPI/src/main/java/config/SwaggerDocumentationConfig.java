package config;


import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
//import springfox.documentation.builders.ApiInfoBuilder;
//import springfox.documentation.builders.PathSelectors;
//import springfox.documentation.builders.RequestHandlerSelectors;
//import springfox.documentation.service.*;
//import springfox.documentation.spi.DocumentationType;
//import springfox.documentation.spring.web.plugins.Docket;
//import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
//@EnableSwagger2
public class SwaggerDocumentationConfig {
//    List<SecurityScheme> test = Arrays.asList(new BasicAuth("test"));
//
//    private BasicAuth basicAuthen() {
//        return new BasicAuth("basicAuth");
//    }
//
//    @Bean
//    public Docket customImplementation(){
//        return new Docket(DocumentationType.SWAGGER_2)
//                .select()
//                .apis(RequestHandlerSelectors.basePackage("com.example.apifirstdemo"))
//                .build()
//                .securitySchemes(Arrays.asList(basicAuthen()))
//                .useDefaultResponseMessages(false)
//                .apiInfo(apiInfo()).host("localhost:8080");
//    }
//
//
//    ApiInfo apiInfo() {
//        return new ApiInfoBuilder()
//            .title("LGV Versatile Supermarket")
//            .description("This is the LGV Versatile Supermarket server based on the OpenAPI 3.0 specification. All the apis are available here. You can help us improve the api by clicking [here](https://www.youtube.com/watch?v=xvFZjo5PgG0&ab_channel=Duran). If you want to know more about us, you can click this [link](https://www.youtube.com/watch?v=xvFZjo5PgG0&ab_channel=Duran) for more information.")
//            .license("MIT License")
//            .licenseUrl("https://choosealicense.com/licenses/mit/")
//            .termsOfServiceUrl("")
//            .version("0.0.1")
//            .contact(new Contact("","", "luugiavinh0@gmail.com"))
//            .build();
//    }

    @Bean
    public OpenAPI openApi() {
        return new OpenAPI()
            .info(new Info()
                .title("LGV Versatile Supermarket")
                .description("This is the LGV Versatile Supermarket server based on the OpenAPI 3.0 specification. All the apis are available here. You can help us improve the api by clicking [here](https://www.youtube.com/watch?v=xvFZjo5PgG0&ab_channel=Duran). If you want to know more about us, you can click this [link](https://www.youtube.com/watch?v=xvFZjo5PgG0&ab_channel=Duran) for more information.")
                .termsOfService("")
                .version("0.0.1")
                .license(new License()
                    .name("MIT License")
                    .url("https://choosealicense.com/licenses/mit/"))
                .contact(new io.swagger.v3.oas.models.info.Contact()
                    .email("luugiavinh0@gmail.com")));
    }

}
