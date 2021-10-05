# Security

What are some common security holes that could exist in your application, and what can you do to prevent them?

## Application Security

### Injection flaws

- Injection flaws are when a user is able to enter a string that is executed. Types include SQL injection and shell injection.
- never use string concatenation to compose SQL or shell commands. Always use a library that escaps and sanitizes the strings for you.

### Buffer Overflows

- An issue where a buffer is overflowed, and overwrites adjacent memory locations.
- Most languages are memory safe and you don't have to worry about this, unless you writing low-level code in C/C++.

### Insecure Cryptographic Storage

- use a one-way hash on secure data.
- prefer libraries like BCrypt over solutions like SHA-256 for secure information.
- use reversible encryption when appropriate, for example on customer data you may need to retrieve.

### Insecure communications

- always uses secure protocols such as HTTPS. avoid unsecure protocols like HTTP and FTP
- limit access to internal data, for example using a VPN.

### Improper Error Handling

- Don't leak sensitive information in error messages.
- This includes logging data to error handlers. Don't accidently send the user's password to bugsnag.

### Cross-Site Scripting (XSS)

- sanitize all user input, including what comes from the URL query string
- have a content security policy (CSP) that bans inline [[JavaScript]]
- avoid passing data to HTML directly, like using [dangerouslySetInnerHTML](https://blog.logrocket.com/using-dangerouslysetinnerhtml-in-a-react-application/) in [[ReactJS]] or using `document.innerHTML`.

### Cross-Site Request Forgery (CSRF / XSRF)

- use origin headers or CSRF tokens to ensure origin of request is allowed.
- never modify data/state using GET requests.

### Two-Factor Authentication (2FA)

- Always confirm that the user in at least two of the three following ways:
  - something they **know** (password)
  - something they **have** (authenticator, phone)
  - something they **are** (biometrics)

### Authorization Errors

- be vary wary of what authenticated users can access and do.
- be mindful of communciations people receive. For example, should a user receive that email or push notification, or do they not have the required permissions?

## Further Reading

- [Bobby Tables - A guide to preventing SQL Injection](https://bobby-tables.com/)
