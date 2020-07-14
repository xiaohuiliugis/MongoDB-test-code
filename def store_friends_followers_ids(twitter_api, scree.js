def store_friends_followers_ids(twitter_api, screen_name=None, user_id=None,
                              friends_limit=maxint, followers_limit=maxint, database=None):
 
    # Must have either screen_name or user_id (logical xor)
    assert (screen_name != None) != (user_id != None) # &quot;Must have screen_name or user_id, but not both&quot;
 
    # See https://dev.twitter.com/docs/api/1.1/get/friends/ids  and
    # See https://dev.twitter.com/docs/api/1.1/get/followers/ids for details on API parameters
 
    get_friends_ids = partial(make_twitter_request, twitter_api.friends.ids, count=5000)
    get_followers_ids = partial(make_twitter_request, twitter_api.followers.ids, count=5000)
 
    for twitter_api_func, limit, label in [
                                 [get_friends_ids, friends_limit, &quot;friends&quot;],
                                 [get_followers_ids, followers_limit, &quot;followers&quot;]
                             ]:
 
        if limit == 0: continue
 
        total_ids = 0
        cursor = -1
        while cursor != 0:
 
            # Use make_twitter_request via the partially bound callable...
            if screen_name:
                response = twitter_api_func(screen_name=screen_name, cursor=cursor)
            else: # user_id
                response = twitter_api_func(user_id=user_id, cursor=cursor)
 
            if response is not None:
                ids = response['ids']
                total_ids += len(ids)
                save_to_mongo({&quot;ids&quot; : [_id for _id in ids ]}, database, label + &quot;_ids&quot;)
                cursor = response['next_cursor']
 
            print &gt;&gt; sys.stderr, 'Fetched {0} total {1} ids for {2}'.format(total_ids, label, (user_id or screen_name))
            sys.stderr.flush()
 
            # Consider storing the ids to disk during each iteration to provide an
            # an additional layer of protection from exceptional circumstances
 
            if len(ids) &gt;= limit or response is None:
                break
                print &gt;&gt; sys.stderr, 'Last cursor', cursor
                print &gt;&gt; sts.stderr, 'Last response', response
 
# Sample usage follows...
 
screen_names = ['SocialWebMining', 'LadyGaga']
 
twitter_api = oauth_login()
 
for screen_name in screen_names:
 
    store_friends_followers_ids(twitter_api, screen_name=screen_name,
                                friends_limit=0, database=screen_name)
 
print &quot;Done&quot;