import React from 'react'; // specficy the module and then specify  the library name
                           //meteor takes care of the rest
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor'; //named export from Meteor
import {UP_Collection_Access, Calculate_rank_and_position_for_posts} from './../imports/api/user_posts.js';
import {UC_Collection_Access} from './../imports/api/user_comments.js';

import App from './../imports/ui/App.js';




//the following is an empty array b/c DDP has synched up with the two DB
console.log(UP_Collection_Access.find().fetch());

//hack fix- set timeout
setTimeout(function(){
  console.log('Posting 2', UP_Collection_Access.find().fetch());

},1000);
//this is a bad solution because it only fires content//if the data updates we wont see the updates











  Meteor.startup(() => {

    //it is better to use built in meteor function called Tracker
    //Tracker queries and reruns code when queries  change
    Tracker.autorun(() => {
    //  console.log('Posting 3', UP_Collection_Access.find().fetch());
      const allPostsInDB=UP_Collection_Access.find({},{sort: {votes: -1}}).fetch();
      const allCommentsInDB=UC_Collection_Access.find({},{sort: {votes: -1}}).fetch();
      let positioned_posts = Calculate_rank_and_position_for_posts(allPostsInDB);

      let title="Facebook";
      ReactDOM.render (<App passedPropTitle={title} passedPropModerator= {'newman'}  passedPropAllPosts={positioned_posts}

      passedPropAllComments={allCommentsInDB}
      passedFooter={'\u00A9 Facebook'/* \u00A9 unicode sequence for copyright */}

      />,
      document.getElementById('content'));
  });


  });


//db stuff

// to find a specfic topic db.user_posts_collection.find({topic: 'dogs'})

// to remove db.users_posts_collection.remove({topic: 'dogs'})
