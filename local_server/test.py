import json
import re


def convert_str_to_number(x):
    total_stars = 0
    num_map = {'K':1000, 'M':1000000, 'B':1000000000}
    if x.isdigit():
        total_stars = int(x)
    else:
        if len(x) > 1:
            total_stars = float(x[:-1]) * num_map.get(x[-1].upper(), 1)
    return int(total_stars)


def cleaning_payload(data):

    cleaned_payload = []
    # p = {"payload":["Bringing you closer to the people and things you love. ❤️For up-to-date COVID-19 information visit:","392m","51","6755"]}
    p = data
    features = p["payload"]

    description = features[0]
    description = re.sub(r'[^A-Za-z0-9 ]+', '',description)
    searchfor = ['Account_desc_word_business', 'Account_desc_word_credit',
        'Account_desc_word_dm', 'Account_desc_word_earn',
        'Account_desc_word_financial', 'Account_desc_word_follow',
        'Account_desc_word_free', 'Account_desc_word_help',
        'Account_desc_word_life', 'Account_desc_word_love',
        'Account_desc_word_make', 'Account_desc_word_marketing',
        'Account_desc_word_money', 'Account_desc_word_online',
        'Account_desc_word_real']

    for word in searchfor:
        if word.split("_")[-1] in description:
            cleaned_payload.append(1)
        else:
            cleaned_payload.append(0)

    number_of_followers = convert_str_to_number(features[1])
    number_of_following = convert_str_to_number(features[2])
    number_of_posts = convert_str_to_number(features[3])

    cleaned_payload.append(number_of_followers/number_of_following)
    cleaned_payload.append(number_of_followers/number_of_posts)
    cleaned_payload.append(number_of_following/number_of_posts)
    cleaned_payload.append(number_of_followers)
    cleaned_payload.append(number_of_following)
    cleaned_payload.append(number_of_posts)
    return cleaned_payload












# cleaned_payload_var = ['Account_desc_word_business', 'Account_desc_word_credit',
#        'Account_desc_word_dm', 'Account_desc_word_earn',
#        'Account_desc_word_financial', 'Account_desc_word_follow',
#        'Account_desc_word_free', 'Account_desc_word_help',
#        'Account_desc_word_life', 'Account_desc_word_love',
#        'Account_desc_word_make', 'Account_desc_word_marketing',
#        'Account_desc_word_money', 'Account_desc_word_online',
#        'Account_desc_word_real', 'followers-followings-ratio',
#        'followers-posts-ratio', 'followings-posts-ratio',
#        'num_followers_cleaned', 'num_following', 'num_of_posts']