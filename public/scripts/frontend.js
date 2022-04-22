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
                console.log(tweet.text)
                html += '<div>' + tweet.text + '</div>'
            })

            setTimeout(function(){
                $('#all-tweets').html(html)
            }, 1000)

        })
    }

    // inject those tweets into the HTML Document
    // DOM

})