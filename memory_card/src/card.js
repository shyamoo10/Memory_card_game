


const Card=({data,handleShuffle})=>{


  return(
   <div  className="card">
    <img src={data.sprites.other.dream_world.front_default} onClick={handleShuffle}></img>
    <h2>{data.name}</h2>
   </div>
  )
}
export default Card;