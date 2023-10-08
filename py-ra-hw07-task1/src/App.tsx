import { differenceInMinutes } from 'date-fns'
import { useState, type FunctionComponent } from 'react'

type PostType = {
  url: string
  date: string
}

function DateTime (props: { date: string }): JSX.Element {
  return (
    <p className="date">{props.date}</p>
  )
}

type DateTimePrettyProps = {
  Component: FunctionComponent<{ date: string }>
  date: string
}

function DateTimePretty ({ Component, date }: DateTimePrettyProps): JSX.Element {
  let convertedDate: string
  const dateDiff = differenceInMinutes(new Date(), new Date(date))

  if (dateDiff > 1440) {
    convertedDate = `${Math.floor(dateDiff / 1440)} дней назад`
  } else if (dateDiff > 60) {
    convertedDate = `${Math.floor(dateDiff / 60)} часов назад`
  } else {
    convertedDate = `${dateDiff} минут назад`
  }

  return <Component date={convertedDate} />
}

function Video (props: PostType): JSX.Element {
  return (
    <div className="video">
      <iframe src={props.url} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
      {/* <DateTime date={props.date} /> */}
      <DateTimePretty date={props.date} Component={DateTime} />
    </div>
  )
}

function VideoList (props: { list: PostType[] }): JSX.Element[] {
  return props.list.map((item, index) => <Video key={index} url={item.url} date={item.date} />)
}

export default function App (): JSX.Element {
  const [list, setList] = useState([
    {
      url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2023-09-10 13:24:00'
    },
    {
      url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2023-09-05 12:10:00'
    },
    {
      url: 'https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2023-09-10 20:16:00'
    },
    {
      url: 'https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2023-09-03 12:10:00'
    },
    {
      url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2023-09-10 16:17:00'
    },
    {
      url: 'https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2023-09-10 05:24:00'
    }
  ])

  return (
    <VideoList list={list} />
  )
}
