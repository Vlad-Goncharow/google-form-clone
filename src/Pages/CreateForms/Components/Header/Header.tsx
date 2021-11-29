import React from 'react'
import Logo from '../../../../components/Logo'
import s from './Header.module.scss'

import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';

import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Link, useParams } from 'react-router-dom';

interface HeaderProps {
	setThemeIsOpen: (val: boolean) => void;
	formRef:any
}

export const Header: React.FC<HeaderProps> = ({ setThemeIsOpen, formRef }) => {
	const {id}:any = useParams()
	const headerRef = React.useRef<HTMLDivElement>(null)
	React.useEffect(() =>{
		let headerHeight = headerRef.current?.clientHeight
		formRef.current.style.paddingTop = headerHeight + 'px'
	},[formRef])
	return (
		<header ref={headerRef} className={s.header}>
			<nav className={s.nav}>
				<div className={s.headerLeft} >
					<ul className={s.headerLeft}>
						<Logo name='Новая форма' />
						<li >
							<FolderOpenOutlinedIcon />
						</li>
						<li>
							<StarBorderOutlinedIcon />
						</li>
					</ul>
				</div>
				<ul className={s.headerRight}>
					<li onClick={() => setThemeIsOpen(true)}>
						<button className={s.headerRight__theme}>
							<PaletteOutlinedIcon />
						</button>
					</li>
					<li>
						<Link to={`/${id}/viewform`}>
							<VisibilityOutlinedIcon />
						</Link>
					</li>
					<li>
						<button className={s.submit}>Отправить</button>
					</li>
				</ul>
			</nav>
			<div className={s.question}>
				<ul>
					<li>Вопросы</li>
					<li>Настройки</li>
				</ul>
			</div>
		</header>
	)
}
