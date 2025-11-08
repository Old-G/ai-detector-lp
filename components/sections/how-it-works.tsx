'use client'

import { HOW_IT_WORKS } from '@/lib/constants'
import { motion, useInView, useScroll, useSpring } from 'motion/react'
import { useRef, useState } from 'react'

const AIIcon = () => (
	<svg
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		className='w-6 h-6'
	>
		<path
			d='M12 2L2 7L12 12L22 7L12 2Z'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
		<path
			d='M2 17L12 22L22 17'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
		<path
			d='M2 12L12 17L22 12'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
)

export function HowItWorks() {
	const [expandedStep, setExpandedStep] = useState<number | null>(null)
	const containerRef = useRef<HTMLDivElement>(null)
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ['start end', 'end start'],
	})

	const scaleY = useSpring(scrollYProgress, {
		stiffness: 100,
		damping: 30,
		restDelta: 0.001,
	})

	return (
		<section
			id='how-it-works'
			ref={containerRef}
			className='w-full py-20 md:py-32 bg-muted/30 relative overflow-hidden'
		>
			{/* Grid Background Pattern */}
			<div className='absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_40%,transparent_100%)]' />

			<div className='container px-4 md:px-6 relative max-w-4xl mx-auto'>
				{/* Section Header */}
				<motion.div
					className='flex flex-col items-center text-center gap-4 mb-16'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					<h2 className='text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight'>
						How It Works
					</h2>
					<p className='text-lg text-muted-foreground max-w-2xl'>
						Four simple steps to verify your content authenticity
					</p>
				</motion.div>

				{/* Timeline */}
				<div className='relative'>
					{/* Vertical line */}
					<div className='absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-primary/20' />
					<motion.div
						className='absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-primary to-cyan-400 origin-top'
						style={{ scaleY }}
					/>

					{/* Steps */}
					{HOW_IT_WORKS.map((step, index) => (
						<TimelineStep
							key={index}
							step={step}
							index={index}
							isExpanded={expandedStep === index}
							onToggle={() =>
								setExpandedStep(expandedStep === index ? null : index)
							}
						/>
					))}
				</div>
			</div>
		</section>
	)
}

function TimelineStep({
	step,
	index,
	isExpanded,
	onToggle,
}: {
	step: (typeof HOW_IT_WORKS)[0]
	index: number
	isExpanded: boolean
	onToggle: () => void
}) {
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true, amount: 0.5 })

	return (
		<motion.div
			ref={ref}
			className={`mb-12 flex justify-between items-center w-full ${
				index % 2 === 0 ? 'md:flex-row-reverse' : ''
			} flex-col md:flex-row`}
			initial={{ opacity: 0, y: 50 }}
			animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
			transition={{ duration: 0.8, delay: index * 0.2 }}
		>
			<div className='hidden md:block md:w-5/12' />

			{/* Center dot */}
			<div className='z-20 mb-4 md:mb-0'>
				<motion.div
					className='flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary to-cyan-400 rounded-full shadow-lg'
					whileHover={{ scale: 1.1 }}
					transition={{ duration: 0.3 }}
				>
					<div className='text-primary-foreground font-bold text-sm'>
						{step.number}
					</div>
				</motion.div>
			</div>

			{/* Content card */}
			<motion.div
				className='w-full md:w-5/12 cursor-pointer'
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				onClick={onToggle}
			>
				<div className='p-6 bg-background/80 backdrop-blur rounded-lg shadow-md border border-primary/10 hover:border-primary/30 transition-colors'>
					<h3 className='text-xl font-bold mb-2 text-foreground'>
						{step.title}
					</h3>
					<p className='text-muted-foreground text-sm leading-relaxed'>
						{step.description}
					</p>
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{
							height: isExpanded ? 'auto' : 0,
							opacity: isExpanded ? 1 : 0,
						}}
						transition={{ duration: 0.3 }}
						className='overflow-hidden'
					>
						<div className='mt-4 pt-4 border-t border-border'>
							<p className='text-xs text-muted-foreground italic'>
								Click to {isExpanded ? 'collapse' : 'expand'} for more details
							</p>
						</div>
					</motion.div>
				</div>
			</motion.div>
		</motion.div>
	)
}
