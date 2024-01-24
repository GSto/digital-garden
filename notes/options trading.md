# Options trading

After losing $800 in my /r/wallstreetbets phase, I decided to do some research and understand how to trade options in a sane matter. I have no idea what I’m doing. I am not a financial advisor, and this is not financial advice.  

## What are options and how do they work? 
Options are contracts that give traders the choice to buy or sell a security (stock, ETF, forex, commodity) at a specified price (strike price) before a certain time (expiration date). These are traded at prices that vary based on how long is left between the expiration, and the difference between the strike price and the price of the underlying security. 

Note: the time value is important here. All options are worth $0.00 after expiry, so the longer an option is for, the more it is worth and vice versa.

Options are rarely executed and are often trading hoping that the value of the option goes up and down. They are traded in groups of 100. 

A **call** option is an option to **buy** a security at a specified price.
A **put** option is an option to **sell** a security at a specified price. 

When trading, you can either buy existing options or write and sell your own. This is where it can get confusing; With any options trade you are taking one of four actions: 

- Buying an option to buy (buying calls)
- Buying an option to sell (buying puts)
- Selling an option to buy (selling calls)
- Selling an option to sell (selling puts) 

## Conservative Options Trading
There are two conservative strategies for options trading: 

- Selling options to buy for securities you own and would be willing to sell. This is called selling covered calls.
- Selling options to buy securities you would be willing to buy and can afford. This is called selling cash-secured puts. 
I’ll cover these two in a bit more detail below.


Medium risk is buying options you have no intention of executing and hoping to sell them later at a higher price.

High risk is the mirror of low risk: selling options to buy securities from you that you do not own, and pray they aren’t executing, known as naked calls. You can buy options to sell stock you don’t own, called a naked put. Would not recommend. 

## Example 1: Selling a Cash Covered Call
**Scenario:** It’s February 24th, and you own 100 shares of AA, currently valued at $27/share ($2,700 position). You’re open to selling them. 

You sell a covered call with a strike price of $30, expiring on 3/26. Currently, these are trading for $0.88. You sell in batches of 100, so you instantly make $88. By selling an option instead of selling the stock, you put a ceiling on your gains, but also give you a chance to reduce risk and potentially generate revenue while holding onto the stock. Selling covered calls makes sense when you are bullish(think the stock will go up)

Let’s look at all the potential outcomes on 3/26:


### Scenario 1: Security Price > Strike Price
AA goes to $32, your options are exercised. You sell your shares for $3,000, which is slightly less than you would have made if you didn’t sell the options. 
- Profit w/ option: $300 from sale + $88 from option = +$388 profit
- Profit w/o option: $500 in gains = +$500 profit

### Scenario 2: Start Price < Security Price < Strike Price
AA hovers around $29. Your options aren’t exercised. You keep the $88 plus $200 in gains. You can sell if you want. 
- Profit w/ option: $200 from gains + $88 from option = +$288 profit
- Profit w/o option: $200 in gains = +$200 profit 

### Scenario 3: Security Price < Start Price
AA goes down to $24. You took a hit, but a smaller one because you made $88 earlier. 
- Loss w/ option: $300 from loss - $88 from option = -$212 loss
- Loss w/o option: $300 from loss = -$300 loss


## Example 2: Selling A Cash Covered Put
Scenario: It’s February 24th, AA is currently valued at $27/share. You have some cash in the bank, and you are interested in AA, and would consider buying. 

You sell a put option to buy AA at $25 share with an expiry of 3/26. These are trading for $2.75 so you make  $275. You are on the hook to buy those shares at that price.

Selling covered puts makes sense when you are bearish(think the stock will go down) 


### Scenario 1: Security Price > Strike Price
AA goes to $32. No one would sell you stock at $25 now, so you keep the initial profit
- Profit w/ option: $275 from option = +275 profit
- Profit w/o option: $500 in gains = +$500 profit

### Scenario 2: Security Price < Start Price
AA goes to $24. Your options are exercised and you buy it at $25. 
- Loss w/ option: -$100 in loss + $275 from option = +$175 profit
- Loss w/o option: -$300 in loss = -$300 loss

**Tags** [[personal finance]]

## Further reading 
- [/r/thetagang wiki](https://www.reddit.com/r/thetagang/wiki/index) - a decent place to get started
- [Trading Options Greeks](https://www.amazon.com/dp/B0091W3CT4/) - The book to read about options. One day I'll buckle down, read this, and finally understand the Greeks. 