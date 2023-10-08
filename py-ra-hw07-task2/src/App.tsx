import { type PropsWithChildren, useState } from 'react'

type ItemType = { views: number } & ({ type: 'video', url: string } | { type: 'article', title: string })

function New (props: PropsWithChildren): JSX.Element {
  return (
    <div className="wrap-item wrap-item-new">
      <span className="label">New!</span>
      {props.children}
    </div>
  )
};

function Popular (props: PropsWithChildren): JSX.Element {
  return (
    <div className="wrap-item wrap-item-popular">
      <span className="label">Popular!</span>
      {props.children}
    </div>
  )
};

function Article (props: { title: string, views: number }): JSX.Element {
  return (
    <div className="item item-article">
      <h3><a href="#">{props.title}</a></h3>
      <p className="views">Прочтений: {props.views}</p>
    </div>
  )
};

function Video (props: { url: string, views: number }): JSX.Element {
  return (
    <div className="item item-video">
      <iframe src={props.url} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
      <p className="views">Просмотров: {props.views}</p>
    </div>
  )
};

function List (props: { list: ItemType[] }): JSX.Element[] {
  return props.list.map((item, index) => {
    switch (item.type) {
      case 'video':
        if (item.views < 100) {
          return <New key={index}><Video {...item} /></New>
        } else if (item.views > 1000) {
          return <Popular key={index}><Video {...item} /></Popular>
        }
        return <Video key={index} {...item} />

      case 'article':
        if (item.views < 100) {
          return <New key={index}><Article {...item} /></New>
        } else if (item.views > 1000) {
          return <Popular key={index}><Article {...item} /></Popular>
        }
        return <Article key={index} {...item} />
    }
  })
};

const itemList: ItemType[] = [
  {
    type: 'video',
    url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
    views: 50
  },
  {
    type: 'video',
    url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
    views: 12
  },
  {
    type: 'article',
    title: 'Невероятные события в неизвестном поселке...',
    views: 175
  },
  {
    type: 'article',
    title: 'Секретные данные были раскрыты!',
    views: 1532
  },
  {
    type: 'video',
    url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
    views: 4253
  },
  {
    type: 'article',
    title: 'Кот Бегемот обладает невероятной...',
    views: 12
  }
]

export default function App (): JSX.Element {
  const [list, setList] = useState(itemList)

  return (
    <List list={list} />
  )
}
