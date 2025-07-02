function Image({
  src,
  alt,
  imgStyle,
}) {
  return (
    <img
      src={src}
      alt={alt}
      style={{
        width: '100%',
        height: 'auto',
        ...imgStyle,
      }}
    />
  )
}

export default Image