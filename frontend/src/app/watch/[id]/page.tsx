'use client';

import { useState, useRef, useEffect } from 'react';
import { Header } from '@/components/header';

import { RecommendedVideoList } from '@/app/watch/_components/recommended-video-list';
import { Suspense } from 'react';
import { VideoDetails } from '@/app/watch/_components/video-details';
import { RecommendedVideoListFallback } from '@/app/watch/_components/fallbacks/recommended-video-list-fallback';
import { VideoInfoFallback } from '@/app/watch/_components/fallbacks/video-info-fallback';
import { Comment } from '@/components/comment';
import { useParams } from 'next/navigation';
import { useVideoCommentsSuspenseQuery } from '../_hooks/queries/useVideoCommentsSuspenseQuery';

// prettier-ignore
const EMOJI_DATA = [
  {
    id: 'youtube',
    label: 'YOUTUBE',
    icon: (active: boolean) => <svg className={`w-5 h-5 ${active ? 'fill-white' : 'fill-[#aaaaaa]'}`} viewBox="0 0 24 24"><path d="M10,15L15.19,12L10,9V15M21.56,7.17C21.69,7.64 21.78,8.27 21.84,9.07C21.91,9.87 21.94,10.66 21.94,11.44V12.56C21.94,13.34 21.91,14.13 21.84,14.93C21.78,15.73 21.69,16.36 21.56,16.83C21.31,17.73 20.73,18.31 19.83,18.56C19.36,18.69 18.5,18.78 17.18,18.84C15.88,18.91 14.69,18.94 13.59,18.94L13.5,18.94C12.41,18.94 11.22,18.91 9.92,18.84C8.6,18.78 7.74,18.69 7.27,18.56C6.37,18.31 5.79,17.73 5.54,16.83C5.41,16.36 5.32,15.73 5.26,14.93C5.19,14.13 5.16,13.34 5.16,12.56V11.44C5.16,10.66 5.19,9.87 5.26,9.07C5.32,8.27 5.41,7.64 5.54,7.17C5.79,6.27 6.37,5.69 7.27,5.44C7.74,5.31 8.6,5.22 9.92,5.16C11.22,5.09 12.41,5.06 13.5,5.06L13.59,5.06C14.69,5.06 15.88,5.09 17.18,5.16C18.5,5.22 19.36,5.31 19.83,5.44C20.73,5.69 21.31,6.27 21.56,7.17Z" /></svg>,
    emojis: ['👋', '🙌', '🔥', '😺', '😸', '😹', '💩', '👻', '👾', '🤖', '👀', '💯', '💢', '💥', '💫', '💦']
  },
  {
    id: 'people',
    label: 'PERSONNES',
    icon: (active: boolean) => <svg className={`w-5 h-5 ${active ? 'fill-white' : 'fill-[#aaaaaa]'}`} viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/></svg>,
    emojis: ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😇', '😉', '😊', '🙂', '🙃', '😋', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '🤪', '😜', '😝', '😛', '🤑', '😎', '🤓', '🧐', '🤠', '🥳', '🤡', '😏', '😶', '😐', '😑', '😒', '🙄', '🤨', '🤔', '🤫', '🤭', '🤥', '😳', '😞', '😟', '😠', '😡', '🤬', '😔', '😕', '🙁', '☹️', '😬', '🥺', '😣', '😖', '😫', '😩', '🥱', '😤', '😮', '😱', '😨', '😰', '😯', '😦', '😧', '😢', '😥', '😪', '🤤', '😓', '😭', '🤩', '😵', '🤯']
  },
  {
    id: 'nature',
    label: 'NATURE',
    icon: (active: boolean) => <svg className={`w-5 h-5 ${active ? 'fill-white' : 'fill-[#aaaaaa]'}`} viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm1.91 12.98l-2.09.04-.63-2.14-1.99.76 1.3-1.81-1.86-1.04 2.13-.19.49-2.17 1.63 1.43 2.11-.32-.97 1.99 1.88 1.45z"/></svg>,
    emojis: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🐤', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🐛', '🦋', '🐌', '🐞', '🐜', '🦗', '🕷', '🕸', '🦂', '🐢', '🐍', '🦎', '🐙', '🦑', '🦐', '🦞', '🦀', '🐡', '🐠', '🐟', '🐬', '🐳', '🐋', '🦈', '🐊', '🐅', '🐆', '🦓', '🦍', '🦧', '🐘', '🦛', '🦏', '🐪', '🐫', '🦒', '🦘', '🐃', '🐂', '🐄', '🐎', '🐖', '🐏', '🐑', '🦙', '🐐', '🦌', '🐕', '🐩', '🦮', '🐕‍🦺', '🐈', '🐓', '🦃', '🦚', '🦜', '🦢', '🦩', '🕊', '🐇', '🦝', '🦨', '🦡', '🦦', '🦥', '🐁', '🐀', '🐿', '🦔', '🐾', '🐉', '🐲', '🌵', '🎄', '🌲', '🌳', '🌴', '🌱', '🌿', '☘️', '🍀', '🎍', '🎋', '🍃', '🍂', '🍁', '🍄', '🐚', '🌾', '💐', '🌷', '🌹', '🥀', '🌺', '🌸', '🌼', '🌻', '🌞', '🌝', '🌛', '🌜', '🌚', '🌕', '🌖', '🌗', '🌘', '🌑', '🌒', '🌓', '🌔', '🌙', '🌎', '🌍', '🌏', '🪐', '💫', '⭐', '🌟', '✨', '⚡', '☄️', '💥', '🔥', '🌪', '🌈', '☀️', '🌤', '⛅', '🌥', '☁️', '🌦', '🌧', '⛈', '🌩', '🌨', '❄️', '☃️', '⛄', '🌬', '💨', '💧', '💦', '☔', '☂️', '🌊', '🌫']
  },
  {
    id: 'food',
    label: 'NOURRITURE',
    icon: (active: boolean) => <svg className={`w-5 h-5 ${active ? 'fill-white' : 'fill-[#aaaaaa]'}`} viewBox="0 0 24 24"><path d="M12 6c1.11 0 2-.9 2-2 0-.38-.1-.73-.29-1.03L12 0l-1.71 2.97c-.19.3-.29.65-.29 1.03 0 1.1.9 2 2 2zm6 3h-5V7h-2v2H6c-1.66 0-3 1.34-3 3v9c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-9c0-1.66-1.34-3-3-3zm1 11H5v-3c.9-.01 1.76-.37 2.4-1.01l1.09-1.09c.39-.39 1.03-.39 1.42 0l1.09 1.09c.64.64 1.5.99 2.4 1.01v3zm0-4.5c-.51-.01-.99-.2-1.35-.57l-1.09-1.09c-.78-.78-2.05-.78-2.83 0l-1.09 1.09c-.36.36-.84.56-1.35.57V12c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v2.5z"/></svg>,
    emojis: ['🍏', '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦', '🥬', '🥒', '🌶', '🌽', '🥕', '🧄', '🧅', '🥔', '🍠', '🥐', '🥯', '🍞', '🥖', '🥨', '🧀', '🥚', '🍳', '🧈', '🥞', '🧇', '🥓', '🥩', '🍗', '🍖', '🦴', '🌭', '🍔', '🍟', '🍕', '🥪', '🥙', '🧆', '🌮', '🌯', '🥗', '🥘', '🥫', '🍝', '🍜', '🍲', '🍛', '🍣', '🍱', '🥟', '🦪', '🍤', '🍙', '🍚', '🍘', '🍥', '🥠', '🥮', '🍢', '🍡', '🍧', '🍨', '🍦', '🥧', '🧁', '🍰', '🎂', '🍮', '🍭', '🍬', '🍫', '🍿', '🍩', '🍪', '🌰', '🥜', '🍯', '🥛', '🍼', '☕', '🍵', '🧃', '🥤', '🍶', '🍺', '🍻', '🥂', '🍷', '🥃', '🍸', '🍹', '🧉', '🍾', '🧊', '🥄', '🍴', '🍽', '🥣', '🥡', '🥢', '🧂']
  },
  {
    id: 'travel',
    label: 'VOYAGE',
    icon: (active: boolean) => <svg className={`w-5 h-5 ${active ? 'fill-white' : 'fill-[#aaaaaa]'}`} viewBox="0 0 24 24"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/></svg>,
    emojis: ['🚗', '🚕', '🚙', '🚌', '🚎', '🏎', '🚓', '🚑', '🚒', '🚐', '🚚', '🚛', '🚜', '🏍', '🛵', '🚲', '🦼', '🦽', '🛴', '🛹', '🚨', '🚔', '🚍', '🚘', '🚖', '🚡', '🚠', '🚟', '🚃', '🚋', '🚞', '🚝', '🚄', '🚅', '🚈', '🚂', '🚆', '🚇', '🚊', '🚉', '✈️', '🛫', '🛬', '🛩', '💺', '🛰', '🚀', '🛸', '🚁', '🛶', '⛵', '🚤', '🛥', '🛳', '⛴', '🚢', '⚓', '⛽', '🚧', '🚦', '🚥', '🚏', '🗺', '🗿', '🗽', '🗼', '🏰', '🏯', '🏟', '🎡', '🎢', '🎠', '⛲', '⛱', '🏖', '🏝', '🏜', '🌋', '⛰', '🏔', '🗻', '🏕', '⛺', '🏠', '🏡', '🏘', '🏚', '🏗', '🏭', '🏢', '🏬', '🏣', '🏤', '🏥', '🏥', '🏦', '🏨', '🏪', '🏫', '🏩', '💒', '🏛', '⛪', '🕌', '🕍', '🛕', '🕋', '⛩', '🛤', '🛣', '🗾', '🎑', '🏞', '🌅', '🌄', '🌠', '🎇', '🎆', '🌇', '🌆', '🏙', '🌃', '🌌', '🌉', '🌁']
  },
  {
    id: 'activity',
    label: 'ACTIVITÉS',
    icon: (active: boolean) => <svg className={`w-5 h-5 ${active ? 'fill-white' : 'fill-[#aaaaaa]'}`} viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>,
    emojis: ['⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉', '🥏', '🎱', '🪀', '🏓', '🏸', '🏒', '🏑', '🥍', '🏏', '🥅', '⛳', '🪁', '🏹', '🎣', '🤿', '🥊', '🥋', '🎽', '🛹', '🛷', '⛸', '🥌', '🎿', '⛷', '🏂', '🪂', '🏋️', '🤼', '🤸', '⛹️', '🤺', '🤾', '🏌️', '🏇', '🧘', '🏄', '🏊', '🤽', '🚣', '🧗', '🚵', '🚴', '🏆', '🥇', '🥈', '🥉', '🏅', '🎖', '🏵', '🎗', '🎫', '🎟', '🎪', '🤹', '🎭', '🩰', '🎨', '🎬', '🎤', '🎧', '🎼', '🎹', '🥁', '🎷', '🎺', '🎸', '🪕', '🎻', '🎲', '♟', '🎯', '🎳', '🎮', '🎰', '🧩']
  },
  {
    id: 'objects',
    label: 'OBJETS',
    icon: (active: boolean) => <svg className={`w-5 h-5 ${active ? 'fill-white' : 'fill-[#aaaaaa]'}`} viewBox="0 0 24 24"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"/></svg>,
    emojis: ['⌚', '📱', '📲', '💻', '⌨️', '🖥', '🖨', '🖱', '🖲', '🕹', '🗜', '💽', '💾', '💿', '📀', '📼', '📷', '📸', '📹', '🎥', '📽', '🎞', '📞', '☎️', '📟', '📠', '📺', '📻', '🎙', '🎚', '🎛', '🧭', '⏱', '⏲', '⏰', '🕰', '⌛', '⏳', '📡', '🔋', '🔌', '💡', '🔦', '🕯', '🪔', '🧯', '🛢', '💸', '💵', '💴', '💶', '💷', '💰', '💳', '💎', '⚖️', '🧰', '🔧', '🔨', '⚒', '🛠', '⛏', '🔩', '⚙️', '🧱', '⛓', '🧲', '🔫', '💣', '🧨', '🪓', '🔪', '🗡', '⚔️', '🛡', '🚬', '⚰️', '⚱️', '🏺', '🔮', '📿', '🧿', '💈', '⚗️', '🔭', '🔬', '🕳', '🩹', '🩺', '💊', '💉', '🩸', '🧬', '🦠', '🧫', '🧪', '🌡', '🧹', '🧺', '🧻', '🚽', '🚰', '🚿', '🛁', '🛀', '🧼', '🪒', '🧽', '🧴', '🛎', '🔑', '🗝', '🚪', '🪑', '🛋', '🛏', '🛌', '🧸', '🖼', '🛍', '🛒', '🎁', '🎈', '🎏', '🎀', '🎊', '🎉', '🎎', '🏮', '🎐', '🧧', '✉️', '📩', '📨', '📧', '💌', '📥', '📤', '📦', '🏷', '📪', '📫', '📬', '📭', '📮', '📯', '📜', '📃', '📄', '📑', '🧾', '📊', '📈', '📉', '🗒', '🗓', '📆', '📅', '🗑', '📇', '🗃', '🗳', '🗄', '📋', '📁', '📂', '🗂', '🗞', '📰', '📓', '📔', '📒', '📕', '📗', '📘', '📙', '📚', '📖', '🔖', '🧷', '🔗', '📎', '🖇', '📐', '📏', '🧮', '📌', '📍', '✂️', '🖊', '🖋', '✒️', '🖌', '🖍', '📝', '✏️', '🔍', '🔎', '🔏', '🔐', '🔒', '🔓']
  },
  {
    id: 'symbols',
    label: 'SYMBOLES',
    icon: (active: boolean) => <svg className={`w-5 h-5 ${active ? 'fill-white' : 'fill-[#aaaaaa]'}`} viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 2h2v5h5v2h-5v5h-2v-5H7v-2h5V5z" transform="rotate(45, 12, 12)"/></svg>,
    emojis: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '☮️', '✝️', '☪️', '🕉', '☸️', '✡️', '🔯', '🕎', '☯️', '☦️', '🛐', '⛎', '♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓', '🆔', '⚛️', '🉑', '☢️', '☣️', '📴', '📳', '🈶', '🈚', '🈸', '🈺', '🈷️', '✴️', '🆚', '💮', '🉐', '㊙️', '㊗️', '🈴', '🈵', '🈹', '🈲', '🅰️', '🅱️', '🆎', '🆑', '🅾️', '🆘', '❌', '⭕', '🛑', '⛔', '📛', '🚫', '💯', '💢', '♨️', '🚷', '🚯', '🚳', '🚱', '🔞', '📵', '🚭', '❗️', '❕', '❓', '❔', '‼️', '⁉️', '🔅', '🔆', '〽️', '⚠️', '🚸', '🔱', '⚜️', '🔰', '♻️', '✅', '🈯', '💹', '❇️', '✳️', '❎', '🌐', '💠', 'Ⓜ️', '🌀', '💤', '🏧', '🚾', '♿', '🅿️', '🈳', '🈂️', '🛂', '🛃', '🛄', '🛅', '🚹', '🚺', '🚼', '🚻', '🚮', '🎦', '📶', '🈁', '🔣', 'ℹ️', '🔤', '🔡', '🔠', '🆖', '🆗', '🆙', '🆒', '🆕', '🆓', '0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟', '🔢', '#️⃣', '*️⃣', '⏏️', '▶️', '⏸', '⏯', '⏹', '⏺', '⏭', '⏮', '⏩', '⏪', '⏫', '⏬', '◀️', '🔼', '🔽', '➡️', '⬅️', '⬆️', '⬇️', '↗️', '↘️', '↙️', '↖️', '↕️', '↔️', '↪️', '↩️', '⤴️', '⤵️', '🔀', '🔁', '🔂', '🔄', '🔃', '🎵', '🎶', '➕', '➖', '➗', '✖️', '♾', '💲', '𒒱', '™️', '©️', '®️', '👁‍🗨', '🔚', '🔙', '🔛', '🔝', '🔜', '〰️', '➰', '➿', '✔️', '☑️', '🔘', '🔴', '🟠', '🟡', '🟢', '🔵', '🟣', '⚫', '⚪', '🟤', '🔺', '🔻', '🔸', '🔹', '🔶', '🔷', '🔳', '🔲', '▪️', '▫️', '◾', '◽', '◼️', '◻️', '🟥', '🟧', '🟨', '🟩', '🟦', '🟪', '⬛', '⬜', '🟫', '🔈', '🔇', '🔉', '🔊', '🔔', '🔕', '📣', '📢', '💬', '💭', '🗯', '♠️', '♣️', '♥️', '♦️', '🃏', '🎴', '🀄', '🕐', '🕑', '🕒', '🕓', '🕔', '🕕', '🕖', '🕗', '🕘', '🕙', '🕚', '🕛', '🕜', '🕝', '🕞', '🕟', '🕠', '🕡', '🕢', '🕣', '🕤', '🕥', '🕦', '🕧']
  }
];

export default function WatchPage() {
  // const [comments, setComments] = useState(initialComments);
  const [commentText, setCommentText] = useState('');
  const [showCommentActions, setShowCommentActions] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [showEmojiPanel, setShowEmojiPanel] = useState(false);
  const [activeCategory, setActiveCategory] = useState('youtube');
  const [searchQuery, setSearchQuery] = useState('');

  const { id: videoId } = useParams<{ id: string }>();
  const { data } = useVideoCommentsSuspenseQuery(videoId);

    const { meta, comments } = data;

  const emojiPanelRef = useRef<HTMLDivElement>(null);
  const emojiTriggerRef = useRef<HTMLButtonElement>(null);
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (showEmojiPanel) {
        if (
          emojiPanelRef.current &&
          !emojiPanelRef.current.contains(event.target as Node) &&
          emojiTriggerRef.current &&
          !emojiTriggerRef.current.contains(event.target as Node)
        ) {
          setShowEmojiPanel(false);
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEmojiPanel]);

  const handleAddComment = () => {
    if (!commentText.trim()) return;

    const newCommentObj = {
      id: Date.now(),
      username: 'Moi',
      avatarLetter: 'V',
      content: commentText,
      daysAgo: 0,
    };

    // setComments([newCommentObj, ...comments]);
    setCommentText('');
    setShowCommentActions(false);
    setIsInputFocused(false);
    setShowEmojiPanel(false);
  };

  const handleCancelComment = () => {
    setCommentText('');
    setShowCommentActions(false);
    setIsInputFocused(false);
    setShowEmojiPanel(false);
  };

  const handleFormatText = (markdown: string) => {
    const input = document.getElementById('comment-input') as HTMLInputElement | null;
    if (!input) return;

    const start = input.selectionStart ?? commentText.length;
    const end = input.selectionEnd ?? commentText.length;
    const selectedText = commentText.substring(start, end);

    let newText;
    let newCursorPos;

    if (start !== end) {
      newText =
        commentText.substring(0, start) +
        markdown +
        selectedText +
        markdown +
        commentText.substring(end);

      newCursorPos = end + 2 * markdown.length;
    } else {
      newText = commentText.substring(0, start) + markdown + markdown + commentText.substring(end);

      newCursorPos = start + markdown.length;
    }

    setCommentText(newText);

    setTimeout(() => {
      input.focus();
      input.selectionStart = newCursorPos;
      input.selectionEnd = newCursorPos;
    }, 0);
  };

  const handleInsertEmoji = (emoji: string) => {
    const input = document.getElementById('comment-input') as HTMLInputElement | null;
    if (!input) return;

    const start = input.selectionStart ?? commentText.length;
    const end = input.selectionEnd ?? commentText.length;

    const newText = commentText.substring(0, start) + emoji + commentText.substring(end);

    setCommentText(newText);
    setShowCommentActions(true);

    const newCursorPos = start + emoji.length;

    setTimeout(() => {
      input.focus();
      input.selectionStart = newCursorPos;
      input.selectionEnd = newCursorPos;
    }, 0);
  };

  const scrollToCategory = (id: string) => {
    setActiveCategory(id);
    const element = categoryRefs.current[id];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const filteredEmojiData = EMOJI_DATA.map(cat => ({
    ...cat,
    emojis: cat.emojis.filter(e => !searchQuery || e.includes(searchQuery)),
  })).filter(cat => cat.emojis.length > 0);

  return (
    <div className="bg-background min-h-screen">
      <Header />

      <main className="mt-16 w-full px-2 py-6 md:px-4">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 md:px-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Suspense fallback={<VideoInfoFallback />}>
              <VideoDetails />
            </Suspense>

            <div className="mt-6">
              <h2 className="text-foreground mb-4 text-base font-bold">
                {comments.length.toLocaleString()} commentaires
              </h2>

              <div className="flex gap-3 pb-6">
                <div className="bg-secondary flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full">
                  <span className="text-foreground text-sm font-semibold">V</span>
                </div>
                <div className="flex-1">
                  <div className="relative">
                    <input
                      id="comment-input"
                      type="text"
                      value={commentText}
                      onChange={e => setCommentText(e.target.value)}
                      onFocus={() => {
                        setShowCommentActions(true);
                        setIsInputFocused(true);
                      }}
                      onBlur={() => {
                        setIsInputFocused(false);
                      }}
                      placeholder={showCommentActions ? '' : 'Ajouter un commentaire public...'}
                      className="peer text-foreground border-secondary placeholder-muted-foreground w-full border-b bg-transparent px-2 py-2 text-sm focus:ring-0 focus:outline-none"
                    />

                    <div
                      className={`bg-foreground absolute bottom-0 left-0 h-[2px] w-full origin-center transition-transform ${isInputFocused ? 'duration-300' : 'duration-0'} ${isInputFocused ? 'scale-x-100' : 'scale-x-0'}`}
                    />
                  </div>

                  {(showCommentActions || commentText.length > 0) && (
                    <div className="mt-2 flex items-center justify-between">
                      <div className="relative flex items-center gap-1">
                        <button
                          ref={emojiTriggerRef}
                          onClick={() => setShowEmojiPanel(s => !s)}
                          onMouseDown={e => e.preventDefault()}
                          className="text-foreground hover:bg-secondary flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-colors"
                          title="Emoji"
                          aria-expanded={showEmojiPanel}
                        >
                          <svg
                            viewBox="0 0 24 24"
                            preserveAspectRatio="xMidYMid meet"
                            focusable="false"
                            className="pointer-events-none block h-5 w-5 fill-current"
                          >
                            <path d="M12,21c4.97,0,9-4.03,9-9S16.97,3,12,3S3,7.03,3,12S7.03,21,12,21z M12,4c4.41,0,8,3.59,8,8s-3.59,8-8,8s-8-3.59-8-8 S7.59,4,12,4z M15.5,11c0.83,0,1.5-0.67,1.5-1.5S16.33,8,15.5,8S14,8.67,14,9.5S14.67,11,15.5,11z M8.5,11C9.33,11,10,10.33,10,9.5 S9.33,8,8.5,8S7,8.67,7,9.5S7.67,11,8.5,11z M12,17c2.03,0,3.8-1.11,4.75-2.75l-0.85-0.5C15.2,15.01,13.73,16,12,16 s-3.2-0.99-3.9-2.25l-0.85,0.5C8.2,15.89,9.97,17,12,17z"></path>
                          </svg>
                        </button>

                        <button
                          onClick={() => handleFormatText('*')}
                          onMouseDown={e => e.preventDefault()}
                          className="ml-1 flex h-6 w-6 cursor-pointer items-center justify-center rounded-[2px] bg-white text-xs font-bold text-black transition-colors hover:bg-gray-200"
                          title="Gras (*texte*)"
                        >
                          B
                        </button>

                        <button
                          onClick={() => handleFormatText('_')}
                          onMouseDown={e => e.preventDefault()}
                          className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-[2px] bg-white font-serif text-xs text-black italic transition-colors hover:bg-gray-200"
                          title="Italique (_texte_)"
                        >
                          I
                        </button>

                        <button
                          onClick={() => handleFormatText('-')}
                          onMouseDown={e => e.preventDefault()}
                          className="relative flex h-6 w-6 cursor-pointer items-center justify-center rounded-[2px] bg-white text-black transition-colors hover:bg-gray-200"
                          title="Barré (-texte-)"
                        >
                          <span className="relative text-[10px] font-semibold">
                            S
                            <div className="absolute top-1/2 left-0 h-[1.5px] w-full -translate-y-1/2 transform bg-black"></div>
                          </span>
                        </button>

                        {showEmojiPanel && (
                          <div
                            ref={emojiPanelRef}
                            className="absolute top-10 left-0 z-20 flex h-[280px] w-[460px] flex-col overflow-hidden rounded-xl border border-[#3e3e3e] bg-[#212121] shadow-2xl"
                            onMouseDown={e => e.preventDefault()}
                          >
                            <style>
                              {`
                                .custom-scrollbar::-webkit-scrollbar {
                                width: 8px;
                                }
                                .custom-scrollbar::-webkit-scrollbar-track {
                                background: transparent; 
                                }
                                .custom-scrollbar::-webkit-scrollbar-thumb {
                                background-color: #717171;
                                border-radius: 4px;
                                }
                                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                                background-color: #555;
                                }
                            `}
                            </style>
                            <div className="sticky top-0 z-10 border-b border-[#3e3e3e]/30 bg-[#212121] p-3">
                              <div className="relative">
                                <input
                                  type="text"
                                  placeholder="Rechercher des emoji"
                                  className="w-full rounded-sm bg-[#3d3d3d] py-1.5 pr-8 pl-3 text-sm text-[#aaaaaa] placeholder-[#aaaaaa] focus:outline-none"
                                  value={searchQuery}
                                  onChange={e => setSearchQuery(e.target.value)}
                                />
                                <div className="absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 transform rounded-[2px] bg-[#fbbc04]"></div>
                              </div>
                            </div>

                            <div className="flex items-center justify-center gap-2 border-b border-[#3e3e3e]/50 bg-[#212121] px-2 py-2">
                              {EMOJI_DATA.map(category => (
                                <button
                                  key={category.id}
                                  onClick={() => scrollToCategory(category.id)}
                                  className={`group relative rounded-full p-1.5 transition-colors hover:bg-[#3d3d3d]`}
                                  title={category.label}
                                >
                                  {category.icon(activeCategory === category.id)}
                                  {activeCategory === category.id && (
                                    <div className="absolute -bottom-2 left-1/2 h-[2px] w-full -translate-x-1/2 transform rounded-t-full bg-white"></div>
                                  )}
                                </button>
                              ))}
                            </div>

                            <div className="custom-scrollbar flex-1 overflow-y-auto p-2">
                              {filteredEmojiData.map(category => (
                                <div
                                  key={category.id}
                                  id={category.id}
                                  ref={el => {
                                    categoryRefs.current[category.id] = el;
                                  }}
                                  className="mb-4"
                                >
                                  <h4 className="mb-2 px-1 text-[11px] font-bold tracking-wide text-[#aaaaaa] uppercase">
                                    {category.label}
                                  </h4>
                                  <div className="grid grid-cols-11 gap-0">
                                    {category.emojis.map((emoji, idx) => (
                                      <button
                                        key={`${category.id}-${idx}`}
                                        onClick={() => handleInsertEmoji(emoji)}
                                        className="flex h-8 w-8 items-center justify-center justify-self-center rounded text-xl transition-colors hover:bg-[#3d3d3d]"
                                      >
                                        {emoji}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              ))}
                              {filteredEmojiData.length === 0 && (
                                <div className="mt-10 text-center text-sm text-[#aaaaaa]">
                                  Aucun emoji trouvé
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleCancelComment}
                          className="text-foreground hover:bg-secondary-foreground/10 rounded-3xl px-4 py-2 text-sm font-medium transition-colors"
                        >
                          Annuler
                        </button>
                        <button
                          onClick={handleAddComment}
                          disabled={!commentText.trim()}
                          className={`rounded-3xl px-4 py-2 text-sm font-medium transition-colors ${
                            commentText.trim()
                              ? 'cursor-pointer bg-[#3ea6ff] text-black hover:bg-[#65b8ff]'
                              : 'bg-secondary text-muted-foreground cursor-default'
                          }`}
                        >
                          Ajouter un commentaire
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-7">
                {comments.map(comment => (
                  <Comment
                    key={comment.id}
                    comment={comment}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <h3 className="text-foreground mb-4 text-sm font-bold">Recommandations</h3>
            <Suspense fallback={<RecommendedVideoListFallback />}>
              <RecommendedVideoList />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}
