import React, { useEffect, useRef, useState } from 'react'
import HeaderTitle from '../components/Content/HeaderTitle'
import Category from '../components/Content/SearchContent/Category'
import ListenedCategory from '../components/Content/SearchContent/ListenedCategory'
import categories from '../static/data/categories'
import mostListened from '../static/data/mostListened'
import ScrollContainer from 'react-indiana-drag-scroll'
import { Icon } from '../icons/Icons'
import search from '../services/search'
import { useSelector } from 'react-redux'
import { selectSearch } from '../store/Search'
import ResultContent from '../components/Content/SearchContent/ResultContent'

function Default() {
  const favRef = useRef();

  const [prev, setPrev] = useState(false);
  const [next, setNext] = useState(false);

  useEffect(() => {
    if (favRef.current) {
      const scrollHandle = () => {
        const isEnd = favRef.current.scrollLeft + favRef.current.offsetWidth + 0.20001220703125 === favRef.current.scrollWidth
        const isFirst = favRef.current.scrollLeft === 0

        setPrev(!isFirst)
        setNext(!isEnd)
      }
      scrollHandle()
      favRef.current.addEventListener('scroll', scrollHandle)
      return () => {
        favRef?.current?.removeEventListener('scroll', scrollHandle)
      }
    }
  }, [favRef])
  const scrollForward = () => {
    favRef.current.scrollLeft += favRef.current.offsetWidth - 300
  }

  const scrollBackward = () => {
    favRef.current.scrollLeft -= favRef.current.offsetWidth - 300
  }

  return (
    <>
      <section className='mb-8'>
        <HeaderTitle title={"Category"} seeAll={false} font={'bold'} textDecoration={'no-underline'} />
        <div className='relative'>
          {prev &&
            (
              <button onClick={scrollBackward} className="w-12 h-12 bg-white text-black flex items-center justify-center rounded-full absolute -left-6 z-10 top-1/2 -translate-y-1/2 hover:scale-[1.06]">
                <Icon name={"preview"} size={16} />
              </button>
            )
          }
          {next &&
            (
              <button onClick={scrollForward} className="w-12 h-12 bg-white text-black flex items-center justify-center rounded-full absolute -right-6 z-10 top-1/2 -translate-y-1/2 hover:scale-[1.06]">
                <Icon name={"next"} size={16} />
              </button>
            )}
          <ScrollContainer
            innerRef={favRef}
            className="flex overflow-x-auto gap-x-6 scroll-smooth">
            {mostListened.map(item => <ListenedCategory key={item.id} category={item} />)}
          </ScrollContainer>
        </div>
      </section>

      <section>
        <HeaderTitle title={"Browse all"} seeAll={false} font={'bold'} textDecoration={'no-underline'} />
        <div className='grid grid-cols-6 gap-6'>
          {categories.map(item => <Category key={item.id} category={item} />)}
        </div>
      </section>
    </>
  )
}

function Search() {
  const { searchResult } = useSelector(selectSearch);
  return (
    <>
      {searchResult ? <ResultContent content={searchResult}/> : <Default />}
    </>
  )
}

export default Search