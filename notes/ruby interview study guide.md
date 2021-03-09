# Ruby Interview Study Guide

- **Concepts**
    - Sidekiq / Jobs
    - ActiveRecord Relations
    - 
- **Questions**
    - **Ruby General**
        - Describe the difference between class and instance variables?
            - Class variables are shared by all instances of a class, while instance variables belong to particular instances. 
  
```ruby
class MyClass
  @@myClassVariable = 'MyClass'
  @myInstanceVariable = 'foo'
end
```

- Everything (amost) in an object in Ruby. Explain? 
    - everything in Ruby is a subclass of the `Class` class, including nil. The parts of the language that aren't objects are blocks, methods, and conditional statements
- There are three ways to invoke a method in Ruby, can you tell me at least two? 
    - dot operator, Object#send, .method(:foo) call.
- Explain this ruby idiom: a ||= b
    - This expression assignments the value of `b` to `a` if `a` is falsy (nil false or undefined).
- What happens when you call a method in Ruby?
- How do you declare a constructor in a ruby class?

```ruby
class MyClass
  def initialize
    # my constructor
  end
```

- When do you use `self` in Ruby?
- What is the difference between a proc and a lmabda?
- What is the splat operator?
- What is the difference between include and extend?
- What is the difference between a class and a module?
- What is the difference between `each`, `select`, `map`, and `collect`?
    - each is the equivalent of JS's "foreach" and returns the array unaltered. `collect` is like JS's map, it returns an altered array.  `map` is an alias for `collect`. `select` works like filter. 
- **Rails General**
    - What are some of your favorite ruby gems, besides Ruby on Rails? 
        - Devise, ActiveAdmin, RSpec
    - What is a Rails engine? 
    - What is the purpose of a rakefile?
    - What is a rails migration?
- **Workers / Jobs**
    - What is ActiveJob? When Should we use it? 
        - A job is a bit of work that is assigned to work in one of many queueing systems.
    - What are some frameworks you have used for background jobs?
        - Sidekiq
- **Controllers / Routing**
    - Describe the CRUD verbs and actions
        - index -> GET
        - new -> GET 
        - create -> POST
        - show -> GET
        - edit -> GET
        - update -> PATCH/PUT
        - delete -> DELETE
    - difference between PUT and PATCH? 
        - PUT requests should supply an updated version of the resource. A PATCH request supplies 
    - Why should you avoid fat controllers? 
        - tight coupling makes applications harder to reason about and debug. Tighter coupling leads to less flexible code, which makes adjusting to changing requirements. It also is a poor seperation of concerns; the single responsibility of a controller is to a request and generate a response. Also, controllers tend to be harder to test.
    - What does the 'resources' method do, and how does it work?
    - How do you set up a single route without using resources?
    - You’re setting up the routes for a website that displays information on different genres of music. Using the URL path /music/ as an example, create a route that uses a single controller action for each genre of music with the actual music genre passed into the controller action as a parameter. The valid music genres are as follows: classical, rock, house, country, hip_hop, and rnb. All other genres should generate a 404 status code.
    - 
- **Active Record**
    - Describe the types of associations in Active Record, and when to use each? 
    - What are scopes? How should you use them?
    - What's the difference between `count`, `length`, and `size`?
    - What are callbacks, and when would you use them? 
    - What are the downsides of callbacks?
    - What's the difference between `delete` and `destroy`?
    - What is the difference between `find` `find_by` and `where` in ActiveRecord?
    - What are some ways to optimize ActiveRecord performance? 
    - 
- **Software engineering**
    - How do you approach refactoring? 
    - How to tackle legacy code / code smells? 
- **Software Arcitecture**
    - "What does "favor composition over inheritance" mean, and why is it important? "
    - Why should you avoid fat models? 
    - How can you avoid fat models? 
    - How can you avoid fat controllers? 
    - Explain Value, Service, Form, View, Query, and Policy Objects techniques [[Ruby on Rails Design Patterns]]
    - What are some rails design patterns you've used?
        - Query pattern for the task queue. 
        - Domain objects for concerns like 3rd party integrations (Stripe)
        - Serializer pattern for JSON APIs __(does this count as a pattern?)__
    - How have you implemented authorization in the past? 
        - Devise, Pundit
- **System Arcitecture**
    - "How would design an API? "
    - "What are the pros and cons of monolithic vs microservice architectures? "
- **Automated Testing**
    - What is unit testing? 
    - What is your testing strategy? 
    - What are your favorite tools for writing unit tests?
    - What are your favorite tools for writing feature tests?
