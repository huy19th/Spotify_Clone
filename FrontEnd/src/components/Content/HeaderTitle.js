import React from 'react'
import { Link } from 'react-router-dom'

function HeaderTitle({ title, seeAll = false , font , textDecoration}) {
    return (
        <>
            <div className='flex items-center justify-between mb-4'>
                <Link to={`/SeeAll/${title}`}>
                    <h3 className={`text-2xl font-${font} text-white tracking-tight font-sans hover:${textDecoration}`}>{title}</h3>
                </Link>
                {seeAll && (
                    <Link to={`/SeeAll/${title}`} className="text-xs font-semibold uppercase text-link font-sans tracking-widest hover:underline ">Show All</Link>
                )}
            </div>
        </>
    )
}

export default HeaderTitle