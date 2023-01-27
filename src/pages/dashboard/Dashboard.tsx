import { DetailTools } from '../../shared/components/DetailTools'
import { BaseLayout } from '../../shared/layouts/BaseLayout'

export const Dashboard: React.FC = () => {
  return (
    <BaseLayout
      title='Página inicial'
      toolbar={(
        <DetailTools showSaveBackButton />
      )}>
      Testando
    </BaseLayout>
  )
}