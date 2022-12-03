import { Container } from "react-bootstrap"

function Home(): JSX.Element {
    return (
        <Container>
            <h4>Игра по поиску тайников размещенных пользователями</h4>

            <p>
                В европейских странах имеется туристическая игра geocaching по поиску тайников
                размещенных в разных уголках мира, а их расположение указывают сами пользователи.
                В тайникам прячут разные вещи: детские игрушки, акссексуары, коллекционные предметы
                и другое. Задача игрока найти эти тайники и взять что нужно и положить свои равноценные
                предметы, затем тайник располагается там где его оставил оригинальный владелец.
            </p>


            Эта игра позволяет повысить навыки ориентирования в местности, посещать доспримечательности,
            а владельцам тайников придумывать самые сложные способы спрятать свой тайник. Однако,
            существуют правила расположения тайников:
            <ul>
                <li>Для поиска и установки тайника не должно быть повреждено чье-то имущество</li>
                <li>Для нахождения тайника не требуется копать землю, пользоватся любыми инструментами</li>
                <li>Тайник должен быть расположен так, чтобы достижение его не вызывало опасность для других. К таким местам относится</li>
                <ul>
                    <li>Верхушки деревьев выше роста человека</li>
                    <li>Около вертикальные склоны</li>
                    <li>Реки с высоким течением</li>
                    <li>И другие</li>
                </ul>
            </ul>


            <p>
                Данный сайт предоставляет возможность искать эти тайники а их владелцам
                добавлять, изменять, удалять оные. А также расказывать короткую историю места и
                двавть подсказки к поиску.
            </p>
        </Container>
    )
}

export default Home