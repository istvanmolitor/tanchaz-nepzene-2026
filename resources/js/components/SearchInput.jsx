import React from 'react';

function SearchInput({ value, onChange }) {
    return (
        <div className="mb-5 flex flex-col items-center justify-center gap-2 md:flex-row md:justify-end">
            <label htmlFor="search" className="text-center text-2xl font-bold text-white md:text-slate-700">
                KERESÉS
            </label>
            <input
                id="search"
                type="search"
                value={value}
                onChange={onChange}
                className="w-64 bg-white px-4 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-500 focus:ring-4"
            />
        </div>
    );
}

export default SearchInput;
