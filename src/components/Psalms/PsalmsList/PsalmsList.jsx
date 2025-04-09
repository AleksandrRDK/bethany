import { useState } from 'react'
import './PsalmsList.sass'

const PsalmsList = () => {
  const [psalms, setPsalms] = useState([])
  const [showAddPopup, setShowAddPopup] = useState(false)
  const [title, setTitle] = useState('')
  const [collection, setCollection] = useState('')
  const [ton, setTon] = useState('')
  const [saro, setSaro] = useState('')
  const [parts, setParts] = useState([])
  const [partType, setPartType] = useState('куплет')
  const [partText, setPartText] = useState('')
  const [search, setSearch] = useState('')
  const [errors, setErrors] = useState({
    title: '',
    collection: '',
    ton: '',
    saro: ''
  })

  const newErrors = {}

  const handleAddPart = () => {
    if (!partText.trim()) return
    setParts([...parts, { type: partType, text: partText }])
    setPartText('')
  }

  const validateFields = () => {
    // Проверяем обязательные поля
    if (!title.trim()) newErrors.title = 'Название произведения обязательно'
    if (!collection.trim()) newErrors.collection = 'Номер в сборнике обязателен'
    if (!ton.trim()) newErrors.ton = 'Тон обязателен'
    if (!saro.trim()) newErrors.saro = 'Саро обязательно'

    setErrors(newErrors)

    // Если ошибок нет, возвращаем true
    return Object.keys(newErrors).length === 0
  }

  const handleAddPsalm = () => {
    if (!validateFields()) return // Если есть ошибки, не добавляем

    const newPsalm = {
      number: psalms.length + 1,
      title,
      collection,
      ton,
      saro,
      parts,
    }

    setPsalms([...psalms, newPsalm])
    setTitle('')
    setCollection('')
    setTon('')
    setSaro('')
    setParts([])
    setShowAddPopup(false)
  }

  const filteredPsalms = psalms.filter(psalm =>
    psalm.title.toLowerCase().includes(search.toLowerCase())
  )

  const showPopup = () => {
    setShowAddPopup(prev => !prev)
    setTitle('')
    setCollection('')
    setTon('')
    setSaro('')
    setParts([])
    setErrors(newErrors)
  }

  return (
    <>
      <div className="psalms__list__wrapper">
        <button onClick={() => showPopup()}>Добавить</button>
        <input
          type="text"
          placeholder="Поиск по сайту"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {showAddPopup && (
        <div className="add__popup">
          <div className="add__popup__header">
            <span className="song__number">{psalms.length + 1}.</span>
            <input
              type="text"
              placeholder="Название произведения"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="song__title"
            />
            {errors.title && <p className="error">{errors.title}</p>}
            <div className="song__meta">
              <input
                type="text"
                placeholder="Тон"
                value={ton}
                onChange={e => setTon(e.target.value)}
              />
              <input
                type="text"
                placeholder="Саро"
                value={saro}
                onChange={e => setSaro(e.target.value)}
              />
              <input
                type="text"
                placeholder="№ в сборнике"
                value={collection}
                onChange={e => setCollection(e.target.value)}
              />
              {errors.ton && <p className="error">{errors.ton}</p>}
              {errors.saro && <p className="error">{errors.saro}</p>}
              {errors.collection && <p className="error">{errors.collection}</p>}
            </div>
          </div>

          <div className="add__text__section">
            <div className="text__form">
              <select
                value={partType}
                onChange={e => setPartType(e.target.value)}
              >
                <option value="куплет">Куплет</option>
                <option value="припев">Припев</option>
              </select>
              <textarea
                placeholder="Введите текст"
                value={partText}
                onChange={e => setPartText(e.target.value)}
              />
              <button onClick={handleAddPart}>+</button>
            </div>

            <div className="text__blocks">
              {parts.map((part, idx) => (
                <div key={idx}>
                  <strong>{part.type}:</strong> {part.text}
                </div>
              ))}
            </div>
          </div>

          <button onClick={handleAddPsalm} className='save__btn'>Сохранить песню</button>
        </div>
      )}

      <div className="psalms__list__item">
        {filteredPsalms.length > 0 ? (
          filteredPsalms.map((psalm, index) => (
            <div className="psalm__item" key={index}>
              <span>{psalm.number}.</span>{' '}
              <span className="psalm__title">
                {psalm.title.length > 25
                  ? psalm.title.slice(0, 25) + '...'
                  : psalm.title}
              </span>{'   '} |{'   '}сборник: {psalm.collection}{'   '}|{'   '}Тон - {psalm.ton}, Саро - {psalm.saro}
            </div>
          ))
        ) : (
          <p>Ничего не найдено</p>
        )}
      </div>
    </>
  )
}

export default PsalmsList
