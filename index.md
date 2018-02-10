### Slingshot

Propel you java project to success

### Usage

> Todo.

### Contributing

> Each sub-generator should act like a microservice and have no dependencies on any other microservice but the base.

#### Common Files

If a sub-generator modifies a commen file (i.e. the pom.xml) the sub-generator is responsible for modifying the file in full.

i.e. If a sub-generator needs to add a build plugin the sub-generator is also responsible for making sure the `<build>` and `<plugins>` elemenets are present, adding them if they are not.

#### Properties

When using the yeoman storage api each sub-generator should take care of its own properties. Properties should be namespaced by sub-generator i.e. a sub-generator of `api` would define all of its properties as `api-property1`

Sub-generators can use properties defined by the base, but shouldn't use properties defined by other sub-generators as at the time the sub-generator runs it cannot guarantee that any other generator, with exception to the base, has run.

#### Base generator

The base generator creates a parent pom in a multi module maven project, sets the group id and artifact id. It then delegates to sub-generators to generate the rest of the repository.
