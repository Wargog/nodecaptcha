# nodecaptcha
A very simple Node package for Google's Nocaptcha Recaptcha

# Usage
```
recaptcha = require('recaptcha')
recaptcha.verify(SECRET_KEY, RECAPTCHA_RESPONSE, (success) => {
	if(success) {
		do_some_stuff()
	} else {
		tell_user_they_goofed()
	}
})
```