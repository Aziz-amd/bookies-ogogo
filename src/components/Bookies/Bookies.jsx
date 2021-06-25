import React, { useCallback, useEffect, useState } from 'react'
import { useHttp } from '../../hooks/http.hook'

export const Bookies = () => {
    const [book, setBook] = useState("")
    const [data, setData] = useState({
        items: [

        ]
    })
    const { request } = useHttp()

    const changeHandler = (event) => {
        setBook(event.target.value)
    }

    const getBookies = useCallback(() => {
        if (book !== "") {
            request(`https://www.googleapis.com/books/v1/volumes?q=${book}`)
                .then((result) => {
                    setData(result)
                })
        } else {
            alert("Заполните поле город!")
        }
    }, [book, request])

    useEffect(() => {
        let ready = true

        if (ready) {
            request(`https://www.googleapis.com/books/v1/volumes?q=${"JavaScript"}`)
                .then((result) => {
                    setData(result)
                })
        }

        return () => ready = false
    }, [request])

    console.log(data)

    return (
        <div className='book'>
            <header className='header'>
                <div className="container">
                    <div className="header_block">
                        <h2>Bookies</h2>
                        <form action="#" className='form'>
                            <input onChange={changeHandler} type="text" name='book' placeholder='Поиск' />
                            <button onClick={(event) => { event.preventDefault(); getBookies() }} type="submit"><span className="material-icons">
                                search
                            </span></button>
                        </form>
                    </div>
                </div>
            </header>
            <div className="result"> 
                <div className="container"> 
                    <div className="result_block"> 
                        {data.items.map(({ volumeInfo }) => { 
                            return ( 
                                <div className="books_info"> 
                                    <div className="image"> 
                                        <img src={volumeInfo.imageLinks ? volumeInfo.imageLinks.smallThumbnail: " " } alt="" /> 
                                    </div> 
                                    <div className="info"> 
                                        <h2>{volumeInfo.title}</h2> 
                                        <p className="subtitle">{volumeInfo.subtitle ? volumeInfo.subtitle : ''}</p> 
                                        <p className="author">{volumeInfo.authors}<span class="material-icons">copyright</span></p> 
                                    </div> 
                                </div> 
                            ) 
                        })} 
                    </div> 
                </div> 
            </div>
        </div>
    )
}