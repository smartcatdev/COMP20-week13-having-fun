
jQuery(document).ready(function() {

    getAllTweets()

    // get all tweets from the API endpoint
    function getAllTweets() {
        $('#all-tweets').show()
        $.ajax({
            url: 'http://localhost:3000/api/tweets'
        })
        .done(function(data) {

            let html = ''

            $(data).each(function(index,tweet) {
                // console.log(tweet.text)
                html += '<div>' + tweet.text + '</div>'
            })

            setTimeout(function(){
                $('#all-tweets').html(html)
            }, 1000)

        })
    }
    // End of GET API call
    

    // Post Tweets via API

    // declare an event for the form submission
    $('#post-tweet').submit(function(event) {
        // prevent the form from reloading the page (default behaviour)
        event.preventDefault()

        // get the value of the text in the tweet text box
        let tweet = $('.the-tweet').val()

        // call the POST endpoint, and give it that data (request)
        let payload = {
            text: tweet
        }

        $.ajax({
            url: 'http://localhost:3000/api/tweets',
            method: 'POST',
            data: JSON.stringify(payload),
            contentType: 'application/json',
            success: function(data) {
                // when successful, reload the tweets showing the new one
                getAllTweets()
                
                // empty the text box
                $('.the-tweet').val('')

                // post a success message to the user
                $('#server-response').html(data.textResponse)
            }
        })
    })




    // when the submission is successful (response), update the list of tweets

    //


})