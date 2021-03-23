import React from 'react'

export default function SelectDrinks(props) {
    const { drinks, selectedValue } = props
    
    return (
        <>
            <div className='pr-5'>
                {drinks.length>1 ?
                    <>
                        <select  onChange={e=>selectedValue(e.target.value)}>
                            {drinks.map(d =>
                                <option key={d.idDrink} value={d.strDrink} >{d.strDrink}</option>
                            )}
                        </select>
                    </> : null
                }
            </div>

        </>
    )
}