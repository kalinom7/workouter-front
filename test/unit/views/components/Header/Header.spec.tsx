import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'
import { Header } from '../../../../../src/views/Home/components/Header/Header'

test('renders Welcome message with user name', async () => {
    const screen = await render(<Header user="John Doe" />)
    await expect.element(screen.getByText('Welcome, John Doe')).toBeVisible()
})