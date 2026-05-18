const express = require('express')
const axios = require('axios');
const cheerio = require('cheerio');
const todolist = express.Router(); //페이지 분리

//조회(데이터가져오기)
todolist.get('/', async (req, res) => { //todolist.get(); 클라이언트 요청시 처리할 함수
    const {keyword} = req.query;

    const d = await axios({
        url: `https://openapi.naver.com/v1/search/news.json?query=${keyword}&display=20&start=1&sort=date`,
        method: 'get',
        headers: {
            "X-Naver-Client-Id": "BaBtlpGRnN7mLeh8WGDa",
            "X-Naver-Client-Secret": "nzlloe2FDH"
        }
    })

    const newsList = d.data.items;

    const results = await Promise.all(
        newsList.map(async (item) => {
            const res = await axios.get(item.link, {
                            headers: {
                                "User-Agent":
                                "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
                            },
                        });
            const $ = cheerio.load(res.data);

            return {
                ...item,
                image: $('meta[property="og:image"]').attr("content") || null,
            };
        })
    );

    console.log(results);
    

  res.send(results);
})


module.exports = todolist;