import { useState, useEffect } from 'react'

const PostItBoard = () => {
  const [postIts] = useState([
    { id: 1, text: "TODO\nOptimiser performances", color: "yellow", rotation: -5 },
    { id: 2, text: "DOING\nPortfolio vintage", color: "blue", rotation: 3 },
    { id: 3, text: "DONE\nApprendre React", color: "green", rotation: -2 },
    { id: 4, text: "IDEA\nAnimation CSS", color: "pink", rotation: 4 },
  ])
  
  const [visiblePostIts, setVisiblePostIts] = useState([])

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisiblePostIts(postIts)
    }, 1000)
    return () => clearTimeout(timer)
  }, [postIts])

  return (
    <div className="postit-board">
      {visiblePostIts.map((postIt, index) => (
        <div
          key={postIt.id}
          className={`postit postit--${postIt.color}`}
          style={{
            transform: `rotate(${postIt.rotation}deg)`,
            animationDelay: `${index * 200}ms`
          }}
        >
          <div className="postit__content">
            {postIt.text.split('\n').map((line, i) => (
              <div key={i} className={i === 0 ? 'postit__title' : 'postit__text'}>
                {line}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default PostItBoard