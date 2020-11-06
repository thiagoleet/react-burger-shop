import * as orderService from './order-service'
import * as ingredientsService from './ingredients-service'

const service = {
  ...orderService,
  ...ingredientsService,
}

export default service
