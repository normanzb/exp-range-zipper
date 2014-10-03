#Range Zipper

This an compressoin experiement done by me, the result turns out trivial but it is quite fun to do it, so that's why here it is. 

Our marketing team wants to have a very strict validation on the telephone number input, to filter out spammers, so we've got a bunch of "valid telephone number ranges" and the file is actually quite large, 383517 bytes in an simplistic JSON format and around 78KB after gzipped.

So my original idea is to save the ranges into a tree which, ideally should save some bytes when there are lots of repeatition at the beginning of the number. However after finish the algorithsm, it turns out the saved bytes are not that many, the final size is 337622 bytes and 55KB after gzipped.

So since the data are all numbers and is going to be represented in text format(old browser does not support byte processing), I decided to try 36 based rather than 10 based. 

The initial result is quite exciting, 305392 bytes after compression, that means 1/3 of original data is gone, however, after gzipped, the data became even larger than without compression, its around 80Ks.