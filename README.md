#Range Zipper

This is an compression experiement, the result turns out trivial but it is quite fun to do it, so that's why here it is. 

Our marketing team wants to have a very strict validation on the telephone number input, to filter out spammers, so we've got a bunch of "valid telephone number ranges" and the file is actually quite large, 383517 bytes in an simplistic JSON format and around 78KB after gzipped.

So my original idea is to save the ranges into a tree which, ideally should save some bytes when there are lots of repeatition at the beginning of the number. the final size is 252392 bytes and 48KB after gzipped, about 2/3rd of original size.

One interest try I did but fail is that, since the data are all numbers and is going to be represented in text format(old browser does not support byte processing), I was about to use 36 based rather than 10 based. The initial result turns out not bad, 241536 bytes after compression, that means 10 more KBs are gone, however, after gzipped, the data became even larger than the one without tree structure based compression, around 80Ks which make 36 based compression useless.

#Run it

Change the options in runner.js and execute it with node.js

    node runner.js