import { ScanModal } from '@/components/modals/scan-modal'
import { Badge } from '@/components/ui/badge'
import { FadeInSection } from '@/components/ui/fade-in-section'
import { HERO_CONTENT } from '@/lib/constants'
import { Check } from 'lucide-react'

export function Hero() {
	return (
		<FadeInSection className='relative w-full min-h-[calc(100vh-4rem)] flex items-center justify-center py-20 md:py-32 overflow-hidden'>
			<section className='relative w-full h-full'>
				{/* Grid Pattern Background - 50% высоты секции, по центру */}
				<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[180%] bg-white dark:bg-black bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_40%,transparent_100%)]' />

				<div className='container px-4 md:px-6 relative z-10'>
					<div className='flex flex-col items-center text-center gap-8 max-w-4xl mx-auto'>
						{/* Badge */}
						<Badge variant='secondary' className='px-4 py-1.5'>
							{HERO_CONTENT.badge}
						</Badge>

						{/* Headline */}
						<h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight'>
							<span className='bg-gradient-to-r from-primary via-purple-500 to-cyan-500 bg-clip-text text-transparent'>
								{HERO_CONTENT.headline}
							</span>
						</h1>

						{/* Subheadline */}
						<p className='text-lg md:text-xl text-muted-foreground max-w-2xl'>
							{HERO_CONTENT.subheadline}
						</p>

						{/* CTAs */}
						<div className='flex flex-col sm:flex-row gap-4 items-center'>
							<ScanModal />
							<a
								href='#pricing'
								className='group relative overflow-hidden inline-flex items-center justify-center h-12 px-8 text-base rounded-md border border-input bg-background transition-all duration-300 hover:bg-transparent hover:text-white hover:border-transparent'
							>
								<span className='absolute inset-0 bg-gradient-to-r from-primary to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
								<span className='relative z-10'>
									{HERO_CONTENT.secondaryCTA}
								</span>
							</a>
						</div>

						{/* Trust Indicators */}
						<div className='flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm text-muted-foreground'>
							{HERO_CONTENT.trustIndicators.map((indicator, index) => (
								<div key={index} className='flex items-center gap-1'>
									<Check className='size-4 text-primary' />
									<span>{indicator}</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>
		</FadeInSection>
	)
}
