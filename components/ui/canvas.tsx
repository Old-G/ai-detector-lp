'use client'

import { useEffect, useRef } from 'react'

// Типы для Oscillator
interface OscillatorOptions {
	phase?: number
	offset?: number
	frequency?: number
	amplitude?: number
}

// Oscillator для волнообразного движения
class Oscillator {
	phase: number
	offset: number
	frequency: number
	amplitude: number
	value: number

	constructor(options: OscillatorOptions = {}) {
		this.phase = options.phase ?? 0
		this.offset = options.offset ?? 0
		this.frequency = options.frequency ?? 0.001
		this.amplitude = options.amplitude ?? 1
		this.value = 0
	}

	update() {
		this.phase += this.frequency
		this.value = this.offset + Math.sin(this.phase) * this.amplitude
		return this.value
	}
}

// Node в линии
class Node {
	x: number = 0
	y: number = 0
	vx: number = 0
	vy: number = 0
}

// Линия с физикой
class Line {
	spring: number
	friction: number
	nodes: Node[]

	constructor(options: { spring: number }) {
		this.spring = options.spring + 0.1 * Math.random() - 0.05
		this.friction = 0.5 + 0.01 * Math.random() - 0.005
		this.nodes = []

		for (let i = 0; i < 50; i++) {
			const node = new Node()
			this.nodes.push(node)
		}
	}

	update(pos: { x: number; y: number }) {
		let spring = this.spring
		let node = this.nodes[0]

		node.vx += (pos.x - node.x) * spring
		node.vy += (pos.y - node.y) * spring

		for (let i = 0; i < this.nodes.length; i++) {
			node = this.nodes[i]

			if (i > 0) {
				const prev = this.nodes[i - 1]
				node.vx += (prev.x - node.x) * spring
				node.vy += (prev.y - node.y) * spring
				node.vx += prev.vx * 0.025
				node.vy += prev.vy * 0.025
			}

			node.vx *= this.friction
			node.vy *= this.friction
			node.x += node.vx
			node.y += node.vy
			spring *= 0.99
		}
	}

	draw(ctx: CanvasRenderingContext2D) {
		let x = this.nodes[0].x
		let y = this.nodes[0].y

		ctx.beginPath()
		ctx.moveTo(x, y)

		for (let i = 1; i < this.nodes.length - 2; i++) {
			const node = this.nodes[i]
			const next = this.nodes[i + 1]
			x = (node.x + next.x) * 0.5
			y = (node.y + next.y) * 0.5
			ctx.quadraticCurveTo(node.x, node.y, x, y)
		}

		const last = this.nodes[this.nodes.length - 2]
		const lastNext = this.nodes[this.nodes.length - 1]
		ctx.quadraticCurveTo(last.x, last.y, lastNext.x, lastNext.y)
		ctx.stroke()
		ctx.closePath()
	}
}

export function Canvas() {
	const canvasRef = useRef<HTMLCanvasElement>(null)

	useEffect(() => {
		// Полностью отключаем на мобильных (< 768px)
		const isMobile = window.innerWidth < 768
		if (isMobile) return

		const canvas = canvasRef.current
		if (!canvas) return

		const ctx = canvas.getContext('2d')
		if (!ctx) return

		let animationFrameId: number
		let isRunning = true
		const pos = { x: 0, y: 0 }
		let lines: Line[] = []

		// Oscillator для цвета (AI-тематика: синий → голубой)
		const colorOscillator = new Oscillator({
			phase: Math.random() * 2 * Math.PI,
			amplitude: 30, // Диапазон hue (220-250 = синий-голубой)
			frequency: 0.002,
			offset: 220, // Начинаем с синего
		})

		// Инициализация линий
		function initLines() {
			lines = []
			const trailCount = window.innerWidth < 768 ? 40 : 60 // Меньше на mobile
			for (let i = 0; i < trailCount; i++) {
				lines.push(
					new Line({
						spring: 0.45 + (i / trailCount) * 0.025,
					})
				)
			}
		}

		// Resize canvas
		function resizeCanvas() {
			if (!canvas) return
			canvas.width = window.innerWidth
			canvas.height = window.innerHeight
		}

		// Mouse/Touch move handler
		function handleMove(e: MouseEvent | TouchEvent) {
			if (e instanceof MouseEvent) {
				pos.x = e.clientX
				pos.y = e.clientY
			} else if (e.touches && e.touches[0]) {
				pos.x = e.touches[0].pageX
				pos.y = e.touches[0].pageY
			}
		}

		// Render loop
		function render() {
			if (!isRunning || !ctx || !canvas) return

			ctx.globalCompositeOperation = 'source-over'
			ctx.clearRect(0, 0, canvas.width, canvas.height)

			ctx.globalCompositeOperation = 'lighter'

			// AI-тематика: синие/голубые оттенки с низкой прозрачностью
			const hue = Math.round(colorOscillator.update())
			ctx.strokeStyle = `hsla(${hue}, 100%, 50%, 0.04)` // Более заметные линии
			ctx.lineWidth = 2 // Тонкие элегантные линии

			lines.forEach(line => {
				line.update(pos)
				line.draw(ctx)
			})

			animationFrameId = requestAnimationFrame(render)
		}

		// Setup
		resizeCanvas()
		initLines()

		// Set initial position to center
		if (canvas) {
			pos.x = canvas.width / 2
			pos.y = canvas.height / 2
		}

		// Event listeners
		window.addEventListener('resize', () => {
			resizeCanvas()
			initLines()
		})
		window.addEventListener('mousemove', handleMove)
		window.addEventListener('touchmove', handleMove)
		window.addEventListener('touchstart', handleMove)

		// Start animation
		render()

		// Cleanup
		return () => {
			isRunning = false
			cancelAnimationFrame(animationFrameId)
			window.removeEventListener('resize', resizeCanvas)
			window.removeEventListener('mousemove', handleMove)
			window.removeEventListener('touchmove', handleMove)
			window.removeEventListener('touchstart', handleMove)
		}
	}, [])

	return (
		<canvas
			ref={canvasRef}
			className='pointer-events-none fixed inset-0 z-50'
			style={{ background: 'transparent' }}
		/>
	)
}
