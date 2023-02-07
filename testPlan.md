## API Test Plan

### Purpose of API
This API is designed to generate text based on a prompt, using the OpenAI API. The API uses the OpenAI text generation model to complete text based on the prompt provided by the user.

### Data handled by API
The API handles text data. The data model used by OpenAI for text generation is "text-davinci-003".

### Endpoints
The API has a single endpoint for text generation. The endpoint is a POST request to `/generic-completion/:prompt`, where `:prompt` is the prompt for the text generation. The structure of the endpoint is as follows:
app.post('/generic-completion/:prompt', async(req , res) => {
// code to generate text
});



## Test Cases

1. Positive Test - Complete text successfully
    - Input:
        ```
        {
            "text": "The sun is shining and the weather is warm today. It is a perfect day to go to the park and play with the kids."
        }
        ```
        Request URL: `/generic-completion/rephrase`
    - Expected Output: 
        ```
        The sun is shining and the weather is warm today. It is a perfect day to go to the park and play with the kids. There are so many fun activities to do, like flying a kite, playing catch, or just relaxing on a picnic blanket. 
        ```
2. Negative Test - No text provided in the request body
    - Input:
        ```
        {}
        ```
        Request URL: `/generic-completion/rephrase`
    - Expected Output: 
        ```
        400 Bad Request 
        {
            "error": "The request body must include a 'text' property"
        }
        ```
3. Negative Test - Missing OpenAI API Key
    - Input:
        ```
        {
            "text": "The sun is shining and the weather is warm today. It is a perfect day to go to the park and play with the kids."
        }
        ```
        Request URL: `/generic-completion/rephrase`
    - Expected Output: 
        ```
        500 Internal Server Error
        ```
4. Edge Test - Input text with maximum token limit (256)
    - Input:
        ```
        {
            "text": "The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog."
        }
        ```
        Request URL: `/generic-completion/max-tokens-limit`
    - Expected Output: 
        ```
        The text rephrased by OpenAI
        ```

