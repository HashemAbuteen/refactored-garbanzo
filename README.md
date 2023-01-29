# APIs

Implemented a generic api to manibulate and generate text using OpenAi Apis
## POST /generic-completion/:prompt
This a generic purpose API , it takes a JSON body as following: 

    { "text" : "Paragraph of text here"}
  Also takes a url param which is compined with the text to make the promt send to the AI.
  **Example :**
	  generic-completion/rephrase
	  body : 
	  {

"text" : "The cat sat on the mat. The mat was red. The cat was black. The cat was happy. The cat was soft. The cat was sleepy. The cat was sleeping. The cat was dreaming. The cat was dreaming about mice. The cat was dreaming about catching mice. The cat was dreaming about eating mice."

}

This call will perform a prompt as follows : 
"rephrase : **text here**"

It returns the following as a plain text: 

The cat was contentedly snoozing on the red mat, its soft black fur rustling in the breeze. Its slumber was filled with dreams of chasing after and devouring little mice.
