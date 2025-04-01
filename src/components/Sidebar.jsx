import React, { useState } from "react"; // useStateをインポート
import "./Sidebar.css";

const Sidebar = ({
    onAddNote,
    notes,
    onDeleteNote,
    activeNote,
    setActiveNote,
    onTogglePin, // 新しいプロパティ
    }) => {

    const [searchQuery, setSearchQuery] = useState(""); // 検索クエリの状態を追加

    const sortedNotes = notes
    .filter((note) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) // 検索クエリでフィルタリング
    )
        notes.sort((a,b) =>{
        // ピン留めされたノートを優先的に表示
        if (a.isPinned === b.isPinned) {
            return b.modDate - a.modDate;
        }
        return a.isPinned ? -1 : 1;
    });

    return (
    <div className="app-sidebar">
        <div className="app-sidebar-header">
            <h1>ノート</h1>
            <input
                    type="text"
                    placeholder="検索"
                    onChange={(e) => setSearchQuery(e.target.value)} // 検索クエリを更新
                    className="search-box"
            />
            <button onClick={onAddNote}>追加</button>
        </div>
        <div className ="app-sidebar-notes">
            {sortedNotes.map((note)=>(
            <div
            className={`app-sidebar-note
                ${note.id === activeNote && "active"}
                ${note.isPinned && "pinned"}`}
            key={note.id}
            onClick={()=>setActiveNote(note.id)}
            >

            <div className="sidebar-note-title">
                    <strong>{note.title}</strong>
                {!note.isPinned && (
                <button onClick={() => onDeleteNote(note.id)}>削除</button>
                )}
                <button
                onClick={(e) => {
                  e.stopPropagation(); // ノート選択を防ぐ
                    onTogglePin(note.id);
                }}
                >
                {note.isPinned ? "📌" : "📍"} {/* ピン留めアイコン */}
                </button>
            </div>

                <p>{note.content}</p>
                <small>
                    {new Date (note.modDate).toLocaleDateString("ja-jp",{
                    hour: "2-digit",
                    minute: "2-digit",
                })}
                </small>
            </div>
            ))}
        </div>
    </div>
    );
};

export default Sidebar;

/// プルリクエスト練習用コメント