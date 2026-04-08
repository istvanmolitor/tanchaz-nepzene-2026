import React from 'react';

function SearchInput({ value, onChange }) {
    return (
        <div className="mb-5">
            <input
                type="search"
                value={value}
                onChange={onChange}
                placeholder="Keresés cím vagy előadó alapján..."
                className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-900 outline-none ring-sky-200 placeholder:text-slate-500 focus:ring-4"
            />
        </div>
    );
}

export default SearchInput;
