# Prompt engineering 

Notes from [Prompt-engineering vs. Blind prompting](https://mitchellh.com/writing/prompt-engineering-vs-blind-prompting)

- Prompt engineers requires a problem you are trying to build a solution for. One example could be extracting a better format out of natural language text. 
    - Ask yourself "does this a large language model?" For example, extracting dates from text like "next Tuesday", there are many libraries that can do this, you don't need a large language model. 
- **Prompts as an engineering practice** - the general idea here is to apply a more systematic approach to prompting: identifying a problem, forming multiple solutions, testing & validating those solutions, and applying continuous refinement to those solutions. 
- **Demonstration set** - part of a prompt that provides examples of what you want the output to look like. 
    - Consider formatting and decoding. Do you want the LLM to strip whitespace? remove special characters? Give you output in a particular format? 
- **Building prompt candidates**
    - It's better for prompts to be assertive than defensive. 
    - come up with multiple reasonable prompts that could work. 
- **Prompt testing**
    - Run through several examples, see what kind of examples you end up with. 
    - Try your prompt against different models. 
    - Remember that you are paying based on the number of tokens in your request. The more tokens you put in, the more expensive your query. Weigh correctness vs. price. Also consider if a larger prompt on a worse model might be better than a small prompt on a higher model (GPT 3.5 vs. GPT 4).
- **Trust but verify**
    - Have a manual feedback mechanism that you can check over time. 
- **Zero-shot vs. few-shot** zero shot is asking the model for feedback, few-shot is giving the prompt a few examples 


