Feature: Prueba de PeopleId 

  Scenario Outline: Obteniendo el Paydload para un Id de personaje
    Given el id del personaje <peopleId>
    When estos son consultados en una api externa
    Then se obtendrá un objeto
    Then el objeto tendrá tantos elementos: <cantidadAtributos>
    Then el statusCode: <statusCode>
    Then el payload tendra la cantidad de elementos: <tamanoPayload>

    Examples:
      | peopleId | cantidadAtributos | statusCode | tamanoPayload |
      | 1        | 2                 | 200        | 16            |
      | 2        | 2                 | 200        | 16            |