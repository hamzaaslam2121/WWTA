
import React, {useState} from 'react'
import styled from 'styled-components'
import {OverlayTrigger, Popover} from 'react-bootstrap'

const MarkerDiv =	styled.div`
	touch-action: none;
	position: absolute;
	top: 50%;
	left: 50%;
	width: 14px;
	height: 14px;
	opacity: ${(props) => (props.verified ? 1.0 : 0.4)};
	background-color: ${(props) => (props.verified ? 'var(--bs-primary)' : 'var(--bs-secondary)')};
	border: 2px solid #fff;
	border-radius: 100%;
	user-select: none;
	transform: translate(-50%, -50%);
	cursor: ${(props) => (props.onMouseOver ? 'pointer' : 'default')};
	&:hover {
		z-index: 1;
	}`

const Marker = ({post}) => {
	const [showPopover, setShowPopover] = useState(false)
	const dateString = new Date(post.date).toLocaleDateString()
	const postUrl = new URL(post.url)
	const postBaseUrl = postUrl.origin
	const postDomain = postUrl.hostname.replace('www.', '')

	const renderPopup = (props) => (
		<Popover className='bg-dark bg-opacity-75'
		         onMouseEnter={() => setShowPopover(true)}
		         onMouseLeave={() => setShowPopover(false)}
		         onPointerDown={() => setShowPopover(true)}
		         {...props}>
			<Popover.Body>
				<div>
					<span>
						<a style={{ fontWeight: 'bold', fontSize: '18px', color: 'white' }}
						   href={post.url}
						   target='_blank' rel='noopener'>
							{post.title}
						</a>
					</span><br/>
					<span style={{ color:'white', fontStyle: 'italic' }}>
						By <a style={{ color: 'white' }} href={postBaseUrl} target='_blank' rel='noopener'>{postDomain}</a>
					</span><br/>
					<span style={{ color: 'white' }}>Added on {dateString}</span>
				</div>
			</Popover.Body>
		</Popover>
	)

	return (
		<OverlayTrigger trigger={['hover', 'focus']}
		                placement='auto'
		                overlay={renderPopup}
		                show={showPopover}
		                style={{ touchAction:'none' }}>
			<MarkerDiv verified={post.verified}
			           className={'marker' + post.id}
			           onMouseEnter={() => setShowPopover(true)}
			           onMouseLeave={() => setShowPopover(false)}/>
		</OverlayTrigger>
	)
}

export default Marker