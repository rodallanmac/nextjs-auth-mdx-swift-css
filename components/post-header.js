import DateFormatter from '../components/date-formatter'
import CoverImage from '../components/cover-image'


export default function PostHeader({ title, coverImage, date, author }) {
  return (
    <>
        <div className="f3 pb075 mw-800 lh-1">{title}</div>
        {author ?
        <div className="flex items-center pb075">
        {author ? <img src={author.picture} className="w3 h3 br-100 mr1 dib" alt={author.name} /> : ''}
        {author ? <div className="text-xl font-bold">{author.name}</div> : ''}  
        </div>
        : ''}

        {date ? <div className="f7 pb2"><DateFormatter dateString={date} /></div> : ''}
        {coverImage ? <CoverImage title={title} src={coverImage} /> : ''}

     
    </>
  )
}
