import { DetailTools } from '../../shared/components/DetailTools'
import { ListingTools } from '../../shared/components/ListingTools'
import { BaseLayout } from '../../shared/layouts/BaseLayout'

export const Dashboard: React.FC = () => {
  return (
    <BaseLayout
      title='Página inicial'
      listingTools={(
        <DetailTools showSaveBackButton />
      )}>
      Testando
    </BaseLayout>
  )
}